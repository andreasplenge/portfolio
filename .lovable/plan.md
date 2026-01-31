
# Plan: Fix LaTeX Generator for Single-Page CV

## Summary

Fix multiple bugs in the Python LaTeX generator that prevent the two-column CV from rendering on a single page.

---

## Issues & Fixes

### Issue 1: Missing `\begin{itemize}` Tags

**File:** `latexGenerator/formatSection.py`

**Problem:** The `formatQualifications` function is missing `\begin{itemize}` before list items in Languages and Tools sections.

**Fix:**
```python
# Line 92-109: Add missing \begin{itemize} tags
return f"""
\\headleft{{Languages}}
\\begin{{itemize}}
{languagesCode}
\\end{{itemize}}

\\headleft{{Programming Languages}}
\\begin{{itemize}}
{programmingCode}
\\end{{itemize}}

\\headleft{{Tools and Frameworks}}
\\begin{{itemize}}
{toolsCode}
\\end{{itemize}}

\\headleft{{Skills}}
\\begin{{itemize}}
{skillsCode}
\\end{{itemize}}
"""
```

### Issue 2: Missing Fixed Height on Left Minipage

**File:** `latexGenerator/generator.py`

**Problem:** The left column minipage needs a fixed height to ensure both columns stay on one page.

**Current (line 81):**
```latex
\begin{minipage}[t]{\textwidth}
```

**Fix:**
```latex
\begin{minipage}[t][293mm][t]{0.82\textwidth}
```

### Issue 3: Missing Padding with `\kern`

**File:** `latexGenerator/generator.py`

**Problem:** The colored box in the working version has `\kern` padding that's missing in the generator.

**Fix:** Add `\kern0.09\textwidth\relax` before and after the inner minipage content.

### Issue 4: Column Width Mismatch

**File:** `latexGenerator/generator.py`

**Problem:** Column widths (0.31 + 0.65 = 0.96) may overflow. The working version uses 0.33 and 0.56.

**Fix:** Update to match working values:
- Left column: 0.33
- Right column: 0.56
- Use `\hskip2.5em` instead of `\hspace{0.01\textwidth}`

---

## Files to Modify

| File | Changes |
|------|---------|
| `latexGenerator/formatSection.py` | Add missing `\begin{itemize}` tags (3 places) |
| `latexGenerator/generator.py` | Fix minipage height, add kern padding, adjust column widths |

---

## Technical Details

### formatSection.py Changes

```python
def formatQualifications(qualifications):
    # ... existing code for building lists ...

    return f"""
\\headleft{{Languages}}
\\begin{{itemize}}
{languagesCode}
\\end{{itemize}}

\\headleft{{Programming Languages}}
\\begin{{itemize}}
{programmingCode}
\\end{{itemize}}

\\headleft{{Tools and Frameworks}}
\\begin{{itemize}}
{toolsCode}
\\end{{itemize}}

\\headleft{{Skills}}
\\begin{{itemize}}
{skillsCode}
\\end{{itemize}}
"""
```

### generator.py Changes

**Left column structure (around lines 69-89):**
```latex
\begin{minipage}[t]{0.33\textwidth}
\colorbox{cvblue}{\begin{minipage}[t][5mm][t]{\textwidth}\null\hfill\null\end{minipage}}

\vspace{-.2ex}
\colorbox{cvbg!90}{\color{cvtext}
\kern0.09\textwidth\relax
\begin{minipage}[t][293mm][t]{0.82\textwidth}
\raggedright
\vspace*{2.5ex}
```

**Column spacing (around line 103):**
```latex
\end{minipage}%
\kern0.09\textwidth\relax
}
\end{minipage}%
\hskip2.5em
```

**Right column (around line 106):**
```latex
\begin{minipage}[t]{0.56\textwidth}
```

---

## Result

After these fixes:
1. All itemize environments will be properly opened and closed
2. The left column will have a fixed height matching the page
3. Both columns will fit side-by-side on a single A4 page
4. The layout will match your working `main.tex` template
