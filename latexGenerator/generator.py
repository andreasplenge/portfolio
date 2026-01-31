from latexGenerator.getData import getData
from latexGenerator.formatSection import formatExperience, formatEducation, formatQualifications, formatInformation
def generateLatexFile():
    experiences = getData("experience")
    educations = getData("education")
    qualifications = getData("qualifications")[0]
    information = getData("information")[0]

    with open("cv.tex", "w") as out:

        out.write(r"""
    \documentclass[11pt, a4paper]{article}

    \usepackage[T1]{fontenc}
    \usepackage[utf8]{inputenc}
    \usepackage[english]{babel}
    \usepackage[left=8mm, right=8mm, top=6mm, bottom=6mm]{geometry}
    \usepackage[stretch=25, shrink=25, tracking=true, letterspace=30]{microtype}
    \usepackage{graphicx}
    \usepackage{xcolor}
    \usepackage{marvosym}

    \usepackage{enumitem}
    \setlist{parsep=0pt, topsep=0pt, partopsep=0pt, itemsep=0.5pt, leftmargin=6mm}

    \usepackage{FiraSans}
    \renewcommand{\familydefault}{\sfdefault}

    %%%%%%% COLORS %%%%%%%%%%%%%%%%%%%%%%%%%%%
    \definecolor{cvblue}{HTML}{304263}   % accent headers / rules
    \definecolor{cvbg}{HTML}{FFFFFF}     % sidebar background
    \definecolor{cvtext}{HTML}{000000}   % main text

    %%%%%%% USER-DEFINED COMMANDS %%%%%%%%%%%%%%%%%%%%%%%%%%%
    \newcommand{\dates}[1]{\hfill\mbox{\textbf{#1}}}
    \newcommand{\is}{\par\vskip.5ex plus .4ex}
    \newcommand{\smaller}[1]{\small$\diamond$\ #1}

    \newcommand{\headleft}[1]{%
    \vspace*{1ex}%
    \textsc{\textbf{#1}}\par
    \vspace*{-0.8ex}%
    \color{cvblue}\hrulefill\par
    \vspace*{0.3ex}%
    }

    \newcommand{\headright}[1]{%
    \vspace*{1.5ex}%
    \textsc{\large\color{cvblue}#1}\par
    \vspace*{-1.5ex}%
    {\color{cvblue}\hrulefill}\par
    }

    \newcommand{\grayed}[1]{\hfill\mbox{\textcolor{gray}{#1}}}

    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    \usepackage[colorlinks=true, urlcolor=cvblue, linkcolor=cvblue]{hyperref}

    \begin{document}

    \setlength{\topskip}{0pt}
    \setlength{\parindent}{0pt}
    \setlength{\parskip}{0pt}
    \setlength{\fboxsep}{0pt}
    \pagestyle{empty}
    \raggedbottom

    % ================= LEFT COLUMN =================
    \begin{minipage}[t]{0.33\textwidth}

    \colorbox{cvblue}{\begin{minipage}[t][5mm][t]{\textwidth}\null\hfill\null\end{minipage}}

    \vspace{-.2ex}
    \colorbox{cvblue!90}{\color{white}
    \kern0.09\textwidth\relax
    \begin{minipage}[t][293mm][t]{0.82\textwidth}
    \raggedright
    \vspace*{2.5ex}

    \includegraphics[width=0.8\textwidth]{public/sign.png}

    \vspace*{0.5ex}
    """)
        out.write(formatInformation(information))

        out.write(formatQualifications(qualifications))


        out.write(r"""
    \headleft{}
    \textbf{References are available upon request}

    \end{minipage}%
    \kern0.09\textwidth\relax
    }
    \end{minipage}%
    \hskip2.5em
    % ================= RIGHT COLUMN =================
    \begin{minipage}[t]{0.56\textwidth}
    \setlength{\parskip}{0.7ex}
    \small

    \vspace{1ex}
    """)

        # ---- Work Experience ----
        out.write(r"""
    \headright{Work Experience}
    """)

        for experience in experiences:
            out.write(formatExperience(experience))

        # ---- Education ----
        out.write(r"""
    \headright{Education}
    """)

        for education in educations:
            out.write(formatEducation(education))

        out.write(r"""
    \end{minipage}
    \end{document}
    """)
