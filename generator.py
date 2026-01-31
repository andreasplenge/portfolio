from getData import getData
from formatSection import formatExperience, formatEducation


experiences = getData("experience")
educations = getData("education")


with open("cv.tex", "w") as out:





    out.write(f"""
    \documentclass[11pt, a4paper]{{article}} 

    \usepackage[T1]{{fontenc}}     
    \usepackage[utf8]{{inputenc}}  
    \usepackage[english]{{babel}}  
    \usepackage[left = 0mm, right = 0mm, top = 0mm, bottom = 0mm]{{geometry}}
    \usepackage[stretch = 25, shrink = 25, tracking=true, letterspace=30]{{microtype}}  
    \usepackage{{graphicx}}        
    \usepackage{{xcolor}}          
    \usepackage{{marvosym}}        

    \usepackage{{enumitem}}        
    \setlist{{parsep = 0pt, topsep = 0pt, partopsep = 1pt, itemsep = 1pt, leftmargin = 6mm}}

    \usepackage{{FiraSans}}        
    \renewcommand{{\familydefault}}{{\sfdefault}}

    \definecolor{{cvblue}}{{HTML}}{{304263}}

    %%%%%%% USER-DEFINED COMMANDS %%%%%%%%%%%%%%%%%%%%%%%%%%%
    \newcommand{{\dates}}[1]{{\hfill\mbox{{\textbf{{#1}}}}}} 
    \newcommand{{\is}}{{\par\vskip.5ex plus .4ex}} 
    \newcommand{{\smaller}}[1]{{\small$\diamond$\ #1}}
    \newcommand{{\headleft}}[1]{{\vspace*{{3ex}}\textsc{{\textbf{{#1}}}}\par%
        \vspace*{{-1.5ex}}\hrulefill\par\vspace*{{0.7ex}}}}
    \newcommand{{\headright}}[1]{{\vspace*{{2.5ex}}\textsc{{\Large\color{{cvblue}}#1}}\par%
        \vspace*{{-2ex}}{{\color{{cvblue}}\hrulefill}}\par}}
    \newcommand{{\grayed}}[1]{{\hfill\mbox{{\textcolor{{gray}}{{#1}}}}}}

    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

    \usepackage[colorlinks = true, urlcolor = white, linkcolor = white]{{hyperref}}

    \begin{{document}}

    % Style definitions -- removes unnecessary space and explicitly adds breaks
    \setlength{{\topskip}}{{0pt}}
    \setlength{{\parindent}}{{0pt}}
    \setlength{{\parskip}}{{0pt}}
    \setlength{{\fboxsep}}{{0pt}}
    \pagestyle{{empty}}
    \raggedbottom

    \begin{{minipage}}[t]{{0.33\textwidth}} %% Left column -- outer definition
    % Left column -- top dark rectangle
    \colorbox{{cvblue}}{{\begin{{minipage}}[t][5mm][t]{{\textwidth}}\null\hfill\null\end{{minipage}}}}

    \vspace{{-.2ex}} 
    \colorbox{{cvblue!90}}{{\color{{white}}  
    \kern0.09\textwidth\relax
    \begin{{minipage}}[t][293mm][t]{{0.82\textwidth}}
    \raggedright
    \vspace*{{2.5ex}}

    \Large Andreas \textbf{{\textsc{{Plenge}}}} \normalsize 

    \vspace*{{0.5ex}} 

    \headleft{{Algo \& Quant Engineer}}
    Engineer with experience in stabilizing the energy grid. I combine a hybrid background in mathematics and software engineering to design scalable analytical tools and model complex systems. I have a strong foundation in dynamical systems, probability, and programming, and I am motivated by solving data-driven problems in performance-sensitive environments, particularly those involving uncertainty, forecasting, and optimization.

    \headleft{{Contact Information}}
    \href{{mailto:andreas.p.andreasen@gmail.com}}
    {{andreas.p.andreasen@gmail.com}}\\
    +45\,52\,99\,06\,66 \\
    \href{{https://www.linkedin.com/in/andreasplenge}}{{Linkedin/andreasplenge}}\\
    \normalsize

    \headleft{{Languages}}
    \begin{{itemize}}
    \item Danish --- Native
    \item English --- Fluent
    \end{{itemize}}

    \headleft{{Programming Languages}}
    \begin{{itemize}}
    \item Python \& R\item noSQL \& SQL\item TypeScript \& JavaScript\item DAX \& M (Power Query)\item Java
    \end{{itemize}}

    \headleft{{Tools \& Frameworks}}
    \begin{{itemize}}
    \item Power BI\item Excel\item Pandas, Numpy \& TensorFlow\item Power Automate
    \end{{itemize}}

    \headleft{{Skills}}
    \begin{{itemize}}
    \item Algorithm Optimization\item Query Optimization\item Data Visualization\item Programming \item Problem-Solving
    \end{{itemize}}
    \headleft{}
    \textbf{{References are available upon request}}

    \end{{minipage}}%
    \kern0.09\textwidth\relax}
    }
    \end{{minipage}}%
    \hskip2.5em
    \begin{{minipage}}[t]{{0.56\textwidth}}
    \setlength{{\parskip}}{{0.8ex}}

    \vspace{{2ex}}

    """)








    out.write(f"""
    {{\headright{{Work Experience}}}}\\\\
    """)

    for experience in experiences:
        out.write(formatExperience(experience))

    out.write(f"""
    {{\headright{{Education}}}}\\\\
    """)
    for education in educations:
        out.write(formatEducation(education))

    out.write(f"""
    \end{{minipage}}\\\\
    \end{{document}}\\\\
    """)