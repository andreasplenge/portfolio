def formatExperience(experience):
    company = experience["company"]
    title = experience["title"]
    start = experience["start"]
    end = experience["end"]
    promotion = experience.get("promotion")
    skills = experience["skills"]
    description = experience["description"]

    promotion_tex = f" \\grayed{{{promotion}}}" if promotion else ""
    skills_tex = ", ".join(skills)

    return rf"""
{{\large\textbf{{{company}}}}}\dates{{{start} -- {end}}}

\textbf{{{title}}}{promotion_tex}

{description}

\smaller{{{skills_tex}}}
"""


def formatEducation(education):
    university = education["university"]
    name = education["name"]
    degree = education["degree"]
    year = education["year"]
    specialization = education.get("specialization")
    thesis = education["thesis"]

    specialization_tex = (
        rf"\item Specialization in \textbf{{{specialization}}}"
        if specialization else ""
    )

    thesis_tex = rf"\item \textbf{{Thesis:}} {thesis}"

    items = "\n".join(
        item for item in [specialization_tex, thesis_tex] if item
    )

    return rf"""
{{\large {degree} in \textbf{{{name}}}}}\dates{{{year}}}

at {university}

\begin{{itemize}}
{items}
\end{{itemize}}
"""

