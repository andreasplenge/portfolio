from getData import getData
from formatSection import formatExperience, formatEducation

experiences = getData("experience")
educations = getData("education")

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
\setlist{parsep=0pt, topsep=0pt, partopsep=0pt, itemsep=0.3pt, leftmargin=6mm}
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
  \vspace*{1.5ex}%
  \textsc{\textbf{#1}}\par
  \vspace*{-1ex}%
  \color{cvblue}\hrulefill\par
  \vspace*{0.3ex}%
}

\newcommand{\headright}[1]{%
  \vspace*{1ex}%
  \textsc{\large\color{cvblue}#1}\par
  \vspace*{-1ex}%
  {\color{cvblue}\hrulefill}\par
}

\newcommand{\grayed}[1]{\hfill\mbox{\textcolor{gray}{#1}}}

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
\usepackage[colorlinks=true, urlcolor=cvblue, linkcolor=cvblue]{hyperref}
\usepackage{paracol}

\begin{document}
\pagestyle{empty}
\setlength{\parindent}{0pt}
\setlength{\parskip}{0pt}
\setlength{\topskip}{0pt}
\setlength{\fboxsep}{0pt}

\begin{paracol}{2}
\setcolumnwidth{0.32\textwidth,0.68\textwidth}

% ================= LEFT COLUMN =================
\switchcolumn*
\small
\color{cvtext}
\raggedright

\includegraphics[width=0.8\linewidth]{public/sign.png}

\headleft{Algo \& Quant Engineer}

Engineer with experience in stabilizing the energy grid. I combine a hybrid background
in mathematics and software engineering to design scalable analytical tools and model
complex systems. I have a strong foundation in dynamical systems, probability, and
programming, and I am motivated by solving data-driven problems in performance-sensitive
environments, particularly those involving uncertainty, forecasting, and optimization.

\headleft{Contact Information}

\href{mailto:andreas.p.andreasen@gmail.com}{andreas.p.andreasen@gmail.com}

+45\,52\,99\,06\,66

\href{https://www.linkedin.com/in/andreasplenge}{LinkedIn/andreasplenge}

\headleft{Languages}
\begin{itemize}[itemsep=0.2pt]
  \item Danish --- Native
  \item English --- Fluent
\end{itemize}

\headleft{Programming Languages}
\begin{itemize}[itemsep=0.2pt]
  \item Python \& R
  \item NoSQL \& SQL
  \item TypeScript \& JavaScript
  \item DAX \& M (Power Query)
  \item Java
\end{itemize}

\headleft{Tools \& Frameworks}
\begin{itemize}[itemsep=0.2pt]
  \item Power BI
  \item Excel
  \item Pandas, NumPy \& TensorFlow
  \item Power Automate
\end{itemize}

\headleft{Skills}
\begin{itemize}[itemsep=0.2pt]
  \item Algorithm Optimization
  \item Query Optimization
  \item Data Visualization
  \item Programming
  \item Problem-Solving
\end{itemize}

\headleft{}
\textbf{References are available upon request}

% ================= RIGHT COLUMN =================
\switchcolumn
\small
\setlength{\parskip}{0.7ex}

\headright{Work Experience}
""")

    for experience in experiences:
        out.write(formatExperience(experience))

    out.write(r"""
\headright{Education}
""")

    for education in educations:
        out.write(formatEducation(education))

    out.write(r"""
\end{paracol}
\end{document}
""")
