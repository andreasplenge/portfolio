from getData import getData
from formatSection import formatExperience, formatEducation


experiences = getData("experience")
educations = getData("education")


with open("cv.tex", "w") as out:
    for experience in experiences:
        out.write(formatExperience(experience))
    for education in educations:
        out.write(formatEducation(education))
