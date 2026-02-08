def formatExperience(experience):
    company = experience["company"]
    title = experience["title"]
    start = experience["start"]
    end = experience["end"]
    promotion = experience.get("promotion")
    skills = experience["skills"]
    description = experience["description"]
    programming = experience["programming"]
    tools = experience["tools"]

    promotion_tex = (
        f" \\grayed{{{promotion}}}" if promotion else ""
    )
    all_skills = skills + programming + tools

    skills_tex = ", ".join(all_skills)

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

def formatInformation(information):
    linkedin = information["linkedin"]
    email = information["email"]
    identity = information["identity"]
    description = information["description"]

    return f"""
    \\headleft{{{identity}}}
    {description}

    \\headleft{{Contact Information}}

    \\href{{mailto:{email}}}{{{email}}}

    \\href{{https://www.linkedin.com/in/{linkedin}}}{{LinkedIn/{linkedin}}}
    """

def formatQualifications(qualifications):
    native_language = qualifications["native_language"]
    fluent_languages = qualifications["fluent_languages"]
    professional_language = qualifications["professional_language"]
    programming = qualifications["programming"]
    tools = qualifications["tools"]
    skills = qualifications["skills"]

    languagesCode = f'\\item {native_language} --- Native'
    for language in fluent_languages:
        languagesCode = languagesCode + f'\\item {language} --- Fluent'
    for language in professional_language:
        languagesCode = languagesCode + f'\\item {language} --- Professional'

    programmingCode = ""
    for programmingLanguage in programming:
        programmingCode = programmingCode + f'\\item {programmingLanguage}'

    toolsCode = ""
    for tool in tools:
        toolsCode = toolsCode + f'\\item {tool}'

    skillsCode = ""
    for skill in skills:
        skillsCode = skillsCode + f'\\item {skill}'

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