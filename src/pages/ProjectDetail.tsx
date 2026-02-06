import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Briefcase, GraduationCap } from "lucide-react";
import GeometricBackground from "@/components/GeometricBackground";
import { useCVSelectedWorkBySlug, useCVGeneralInfo } from "@/hooks/use-cv-data";

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: project, isLoading } = useCVSelectedWorkBySlug(slug);
  const { data: generalInfo } = useCVGeneralInfo();

  const lastCompiled = generalInfo?.last_compiled
    ? new Date(generalInfo.last_compiled).toISOString().split('T')[0]
    : new Date().toISOString().split('T')[0];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light mb-4">Project not found</h1>
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            ← Back to CV
          </Link>
        </div>
      </div>
    );
  }

  const relatedExperience = project.related_experience;
  const relatedEducation = project.related_education;
  const hasRelation = relatedExperience || relatedEducation;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <GeometricBackground />

      <main className="relative max-w-4xl mx-auto px-6 py-16 md:py-24">
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to CV
        </Link>

        {/* Project Header */}
        <header className="mb-12">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
            Selected Work
          </p>
          <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4">
            {project.title}
          </h1>
          <p className="text-lg text-muted-foreground font-light max-w-2xl">
            {project.description}
          </p>
        </header>

        {/* Project Content - Overview */}
        {project.full_description && (
          <Section title="Overview">
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line mb-8">
              {project.full_description}
            </p>

            {project.image_name && (
              <div className="mt-8 overflow-hidden rounded-lg">
                <img
                  src={`/projects/${project.image_name}`}
                  alt={project.title}
                  className="w-full h-auto block"
                />
              </div>
            )}
          </Section>
        )}

        {/* Related Experience/Education */}
        {hasRelation && (
          <Section title={relatedExperience ? "Professional Context" : "Academic Project"}>
            <div className="p-5 border border-border rounded-lg bg-card">
              {relatedExperience && (
                <div className="flex items-start gap-4">
                  <Briefcase className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold">{relatedExperience.role}</h4>
                    <p className="text-muted-foreground">{relatedExperience.company}</p>
                    <p className="text-sm text-muted-foreground mt-1">{relatedExperience.period}</p>
                    {relatedExperience.location && (
                      <p className="text-xs text-muted-foreground mt-1">{relatedExperience.location}</p>
                    )}
                  </div>
                </div>
              )}
              {relatedEducation && (
                <div className="flex items-start gap-4">
                  <GraduationCap className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold">{relatedEducation.degree}</h4>
                    <p className="text-muted-foreground">{relatedEducation.institution}</p>
                    <p className="text-sm text-muted-foreground mt-1">{relatedEducation.year}</p>
                  </div>
                </div>
              )}
            </div>
          </Section>
        )}

        {project.features && project.features.length > 0 && (
          <Section title="Features">
            <ul className="space-y-2">
              {project.features.map((feature, i) => (
                <li key={i} className="text-sm text-muted-foreground flex gap-3">
                  <span className="text-primary">→</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {project.link && (
          <Section title="Links">
            <a
              href={project.link.startsWith('http') ? project.link : `https://${project.link}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              → {project.link}
            </a>
          </Section>
        )}

        {/* Technical Stack - Using categorized skills from data */}
        {(project.programming_skills?.length > 0 ||
          project.tool_skills?.length > 0 ||
          project.domain_skills?.length > 0) && (
            <Section title="Technical Stack">
              <div className="grid md:grid-cols-2 gap-8">
                {project.programming_skills?.length > 0 && (
                  <div>
                    <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Languages</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.programming_skills.map((skill) => (
                        <span key={skill} className="px-3 py-1.5 rounded-md bg-secondary text-sm text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {project.tool_skills?.length > 0 && (
                  <div>
                    <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Tools & Frameworks</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tool_skills.map((skill) => (
                        <span key={skill} className="px-3 py-1.5 rounded-md bg-secondary text-sm text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {project.domain_skills?.length > 0 && (
                  <div>
                    <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Expertise</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.domain_skills.map((skill) => (
                        <span key={skill} className="px-3 py-1.5 rounded-md bg-secondary text-sm text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Section>
          )}

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground text-center tracking-wide">
            Last updated {lastCompiled}
          </p>
        </footer>
      </main>
    </div>
  );
};

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <section className="mb-14">
    <div className="flex items-center gap-3 mb-6">
      <h2 className="text-lg font-semibold tracking-tight text-foreground">{title}</h2>
      <div className="flex-1 h-px bg-border" />
    </div>
    {children}
  </section>
);

export default ProjectDetail;
