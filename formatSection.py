def formatExperience(experience):
    company = experience["company"]
    title = experience["title"]
    start = experience["start"]
    end = experience["end"]
    promotion = experience.get("promotion")
    skills = experience["skills"]
    description = experience["description"]

    promotion_tex = (
        f" \\grayed{{{promotion}}}" if promotion else ""
    )

    skills_tex = ", ".join(skills)

    return f"""
{{\\large\\textbf{{{company}}}}}\\dates{{{start} -- {end}}}

\\textbf{{{title}}}{promotion_tex} \\\\
\\\\
{description}\\\\
\\smaller{{{skills_tex}}}\\\\
"""

def formatEducation(education):
    university = education["university"]
    name = education["name"]
    degree = education["degree"]
    year = education["year"]
    specialization = education.get("specialization")
    thesis = education["thesis"]

    specialization_tex = (
        f"    \\item Specialization in \\textbf{{{specialization}}}\n"
        if specialization else ""
    )

    thesis_tex = f"    \\item \\textbf{{Thesis:}} {thesis}"

    return f"""
    {{\\large {degree} in \\textbf{{{name}}}}} \\dates{{{year}}}

    at {university}
    \\begin{{itemize}}
    {specialization_tex}{thesis_tex}
    \\end{{itemize}}
    """
