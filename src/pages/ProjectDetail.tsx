import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Briefcase, GraduationCap } from "lucide-react";
import GeometricBackground from "@/components/GeometricBackground";
import { useCVSelectedWorkBySlug } from "@/hooks/use-cv-data";

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: project, isLoading } = useCVSelectedWorkBySlug(slug);

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
          <h1 className="text-xl font-semibold mb-4">Project not found</h1>
          <Link to="/" className="text-sm text-primary hover:underline">
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

      <main className="relative max-w-4xl mx-auto px-6 py-16 md:py-20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to CV
        </Link>

        <header className="mb-10 bg-card border border-border rounded p-8">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
            {project.title}
          </h1>
          <p className="text-muted-foreground leading-relaxed max-w-2xl">
            {project.description}
          </p>
        </header>

        {project.full_description && (
          <div className="mb-10">
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {project.full_description}
            </p>
            {project.image_name && (
              <div className="mt-6 overflow-hidden rounded">
                <img
                  src={`/projects/${project.image_name}`}
                  alt={project.title}
                  className="w-full h-auto block"
                />
              </div>
            )}
          </div>
        )}

        {hasRelation && (
          <Section title={relatedExperience ? "Professional Context" : "Academic Context"}>
            <div className="p-5 border border-border rounded bg-card">
              {relatedExperience && (
                <div className="flex items-start gap-4">
                  <Briefcase className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold">{relatedExperience.role}</h4>
                    <p className="text-sm text-muted-foreground">{relatedExperience.company}</p>
                    <p className="text-xs text-muted-foreground mt-1">{relatedExperience.period}</p>
                  </div>
                </div>
              )}
              {relatedEducation && (
                <div className="flex items-start gap-4">
                  <GraduationCap className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold">{relatedEducation.degree}</h4>
                    <p className="text-sm text-muted-foreground">{relatedEducation.institution}</p>
                    <p className="text-xs text-muted-foreground mt-1">{relatedEducation.year}</p>
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
                  <span className="text-primary font-bold">—</span>
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
              className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
            >
              {project.link}
            </a>
          </Section>
        )}

        {(project.programming_skills?.length > 0 ||
          project.tool_skills?.length > 0 ||
          project.domain_skills?.length > 0) && (
          <Section title="Technical Stack">
            <div className="grid md:grid-cols-3 gap-6">
              {project.programming_skills?.length > 0 && (
                <SkillGroup label="Languages" items={project.programming_skills} />
              )}
              {project.tool_skills?.length > 0 && (
                <SkillGroup label="Tools & Frameworks" items={project.tool_skills} />
              )}
              {project.domain_skills?.length > 0 && (
                <SkillGroup label="Domain Expertise" items={project.domain_skills} />
              )}
            </div>
          </Section>
        )}

        <footer className="mt-16 pt-6 border-t border-border flex justify-center">
          <img src="/sign.png" alt="Signature" className="h-14 opacity-60" />
        </footer>
      </main>
    </div>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-10">
    <div className="flex items-center gap-4 mb-5">
      <h2 className="text-sm font-bold uppercase tracking-widest text-primary">{title}</h2>
      <div className="flex-1 h-px bg-border" />
    </div>
    {children}
  </section>
);

const SkillGroup = ({ label, items }: { label: string; items: string[] }) => (
  <div>
    <h4 className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">{label}</h4>
    <div className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <span key={item} className="px-2.5 py-1 text-xs bg-secondary text-secondary-foreground rounded">
          {item}
        </span>
      ))}
    </div>
  </div>
);

export default ProjectDetail;
