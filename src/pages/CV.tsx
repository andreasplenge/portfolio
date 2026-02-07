import { Linkedin, Mail, ExternalLink, MapPin, Github, Download, Building2, GraduationCap } from "lucide-react";
import GeometricBackground from "@/components/GeometricBackground";
import { Link } from "react-router-dom";
import {
  useCVGeneralInfo,
  useCVTechnicalDomains,
  useCVExperience,
  useCVSelectedWork,
  useCVEducation,
  useCVPublications,
  getHighlightedSkillsByType,
} from "@/hooks/use-cv-data";

const CV = () => {
  const { data: generalInfo, isLoading: loadingInfo } = useCVGeneralInfo();
  const { data: technicalDomains, isLoading: loadingDomains } = useCVTechnicalDomains();
  const { data: experience, isLoading: loadingExperience } = useCVExperience();
  const { data: selectedWork, isLoading: loadingWork } = useCVSelectedWork();
  const { data: education, isLoading: loadingEducation } = useCVEducation();
  const { data: publications, isLoading: loadingPublications } = useCVPublications();

  const isLoading = loadingInfo || loadingDomains || loadingExperience || loadingWork || loadingEducation || loadingPublications;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    );
  }

  // Get skills from qualifications (highlighted ones)
  const qualLanguages = technicalDomains ? getHighlightedSkillsByType(technicalDomains, 'language') : [];
  const qualTools = technicalDomains ? getHighlightedSkillsByType(technicalDomains, 'tool') : [];
  const qualSkills = technicalDomains ? getHighlightedSkillsByType(technicalDomains, 'skill') : [];

  // Get skills from all experiences
  const expProgramming = experience?.flatMap(e => e.programming_skills || []) || [];
  const expTools = experience?.flatMap(e => e.tool_skills || []) || [];
  const expDomainSkills = experience?.flatMap(e => e.domain_skills || []) || [];

  // Get skills from all projects
  const projProgramming = selectedWork?.flatMap(p => p.programming_skills || []) || [];
  const projTools = selectedWork?.flatMap(p => p.tool_skills || []) || [];
  const projDomainSkills = selectedWork?.flatMap(p => p.domain_skills || []) || [];

  // Get skills from all education
  const eduProgramming = education?.flatMap(e => e.programming_skills || []) || [];
  const eduTools = education?.flatMap(e => e.tool_skills || []) || [];
  const eduDomainSkills = education?.flatMap(e => e.domain_skills || []) || [];

  // Combine and dedupe all skills
  const allProgramming = [...new Set([...qualLanguages, ...expProgramming, ...projProgramming, ...eduProgramming])];
  const allTools = [...new Set([...qualTools, ...expTools, ...projTools, ...eduTools])];
  const allSkills = [...new Set([...qualSkills, ...expDomainSkills, ...projDomainSkills, ...eduDomainSkills])];

  // Build sections array with only sections that have content
  const sections: { title: string; content: React.ReactNode }[] = [];

  if (generalInfo?.summary) {
    sections.push({
      title: "Profile",
      content: (
        <p className="text-muted-foreground leading-relaxed max-w-3xl">
          {generalInfo.summary}
        </p>
      ),
    });
  }

  // Filter to only show "selected_work" visibility on CV page
  const visibleSelectedWork = selectedWork?.filter((w) => w.visibility === "selected_work") || [];

  if (visibleSelectedWork.length > 0) {
    sections.push({
      title: "Key Projects",
      content: (
        <div className="grid md:grid-cols-2 gap-5">
          {visibleSelectedWork.map((project) => {
            const relatedExp = project.related_experience_id
              ? experience?.find(e => e.id === project.related_experience_id)
              : null;
            const relatedEdu = project.related_education_id
              ? education?.find(e => e.id === project.related_education_id)
              : null;
            const affiliation = relatedExp?.company || relatedEdu?.institution || null;
            const affiliationType = relatedExp ? "company" : relatedEdu ? "education" : null;
            return (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description || ""}
                affiliation={affiliation}
                affiliationType={affiliationType}
                slug={project.slug || project.id}
              />
            );
          })}
        </div>
      ),
    });
  }

  if (experience && experience.length > 0) {
    sections.push({
      title: "Professional Experience",
      content: (
        <div className="space-y-0">
          {experience.map((exp) => (
            <ExperienceItem
              key={exp.id}
              id={exp.id}
              title={exp.role}
              company={exp.company}
              period={exp.period}
              location={exp.location || ""}
              description={exp.description || ""}
            />
          ))}
        </div>
      ),
    });
  }

  if (education && education.length > 0) {
    sections.push({
      title: "Education",
      content: (
        <div className="space-y-5">
          {education.map((edu) => (
            <div key={edu.id} className="flex justify-between items-start flex-wrap gap-2">
              <div>
                <h4 className="font-semibold text-foreground">{edu.degree}</h4>
                <p className="text-muted-foreground text-sm">{edu.institution}</p>
                {edu.specialization && (
                  <p className="text-muted-foreground text-sm mt-0.5">
                    {edu.specialization}
                  </p>
                )}
                {edu.thesis && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Thesis: "{edu.thesis}"
                  </p>
                )}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">{edu.year}</span>
                <Link
                  to={`/education/${edu.id}`}
                  className="p-1.5 rounded text-muted-foreground hover:bg-secondary hover:text-primary transition-colors"
                  title="View details"
                >
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ),
    });
  }

  if (publications && publications.length > 0) {
    sections.push({
      title: "Publications",
      content: (
        <div className="space-y-4">
          {publications.map((pub) => (
            <div key={pub.id}>
              <p className="text-sm">
                {pub.authors && <span className="text-muted-foreground">{pub.authors}</span>}{" "}
                "{pub.title}"
              </p>
              {pub.venue && (
                <p className="text-xs text-muted-foreground mt-1">
                  {pub.venue}{pub.year && ` · ${pub.year}`}
                </p>
              )}
            </div>
          ))}
        </div>
      ),
    });
  }

  const hasSkills = allProgramming.length > 0 || allTools.length > 0 || allSkills.length > 0;

  if (hasSkills) {
    sections.push({
      title: "Core Competencies",
      content: (
        <div className="grid md:grid-cols-3 gap-6">
          {allProgramming.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">Languages</h4>
              <div className="flex flex-wrap gap-1.5">
                {allProgramming.map((lang) => (
                  <span key={lang} className="px-2.5 py-1 text-xs bg-secondary text-secondary-foreground rounded">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          )}
          {allTools.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">Tools & Frameworks</h4>
              <div className="flex flex-wrap gap-1.5">
                {allTools.map((tool) => (
                  <span key={tool} className="px-2.5 py-1 text-xs bg-secondary text-secondary-foreground rounded">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}
          {allSkills.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">Domain Expertise</h4>
              <div className="flex flex-wrap gap-1.5">
                {allSkills.map((skill) => (
                  <span key={skill} className="px-2.5 py-1 text-xs bg-secondary text-secondary-foreground rounded">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      ),
    });
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <GeometricBackground />

      <main className="relative max-w-4xl mx-auto px-6 py-16 md:py-20">
        {/* Header */}
        <header className="mb-14 bg-card border border-border rounded p-8">
          <div className="flex items-start justify-between flex-wrap gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-1">
                Andreas Plenge
              </h1>
              <p className="text-base text-primary font-medium">
                {generalInfo?.title || "Software Engineer"}
              </p>
            </div>
            <div className="flex flex-col gap-1.5 text-sm text-muted-foreground">
              {generalInfo?.email && (
                <a href={`mailto:${generalInfo.email}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Mail className="w-3.5 h-3.5" />
                  <span>{generalInfo.email}</span>
                </a>
              )}
              {generalInfo?.linkedin && (
                <a href={`https://${generalInfo.linkedin.replace(/^https?:\/\//, '')}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
              )}
              {generalInfo?.github && (
                <a href={`https://${generalInfo.github.replace(/^https?:\/\//, '')}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              )}
              {generalInfo?.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{generalInfo.location}</span>
                </div>
              )}
              {generalInfo?.cv_pdf_link && (
                <a 
                  href={generalInfo.cv_pdf_link} 
                  download 
                  className="inline-flex items-center gap-2 mt-2 px-4 py-1.5 bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-wider rounded hover:opacity-90 transition-opacity"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download CV
                </a>
              )}
            </div>
          </div>
        </header>

        {/* Render sections */}
        {sections.map((section) => (
          <Section key={section.title} title={section.title}>
            {section.content}
          </Section>
        ))}

        {/* Footer */}
        <footer className="mt-16 pt-6 border-t border-border flex justify-center">
          <img src="/sign.png" alt="Signature" className="h-14 opacity-60" />
        </footer>
      </main>
    </div>
  );
};

const Section = ({ 
  title, 
  children 
}: { 
  title: string; 
  children: React.ReactNode;
}) => (
  <section className="mb-12">
    <div className="flex items-center gap-4 mb-5">
      <h2 className="text-sm font-bold uppercase tracking-widest text-primary">{title}</h2>
      <div className="flex-1 h-px bg-border" />
    </div>
    {children}
  </section>
);

const ExperienceItem = ({
  id,
  title,
  company,
  period,
  location,
  description
}: {
  id: string;
  title: string;
  company: string;
  period: string;
  location: string;
  description: string;
}) => (
  <div className="py-5 border-b border-border last:border-0">
    <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
      <div>
        <h4 className="font-semibold text-foreground">{title}</h4>
        <p className="text-muted-foreground text-sm">{company}</p>
      </div>
      <div className="text-right flex items-start gap-3">
        <div>
          <span className="text-sm text-muted-foreground block">{period}</span>
          {location && <span className="text-xs text-muted-foreground">{location}</span>}
        </div>
        <Link
          to={`/experience/${id}`}
          className="p-1.5 rounded text-muted-foreground hover:bg-secondary hover:text-primary transition-colors"
          title="View details"
        >
          <ExternalLink className="w-4 h-4" />
        </Link>
      </div>
    </div>
    {description && (
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    )}
  </div>
);

const ProjectCard = ({
  title,
  description,
  affiliation,
  affiliationType,
  slug
}: {
  title: string;
  description: string;
  affiliation: string | null;
  affiliationType: "company" | "education" | null;
  slug: string;
}) => (
  <Link 
    to={`/project/${slug}`}
    className="group block bg-card border border-border rounded hover:border-primary/40 hover:shadow-sm transition-all duration-200"
  >
    <div className="border-l-2 border-primary p-5">
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm">{title}</h4>
        <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 ml-2" />
      </div>
      <p className="text-xs text-muted-foreground mb-3 leading-relaxed line-clamp-3">{description}</p>
      {affiliation && (
        <div className="flex items-center gap-1.5 text-xs text-primary/70">
          {affiliationType === "company" ? (
            <Building2 className="w-3 h-3" />
          ) : (
            <GraduationCap className="w-3 h-3" />
          )}
          <span>{affiliation}</span>
        </div>
      )}
    </div>
  </Link>
);

export default CV;
