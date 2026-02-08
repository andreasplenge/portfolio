import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, MapPin, Calendar } from "lucide-react";
import GeometricBackground from "@/components/GeometricBackground";
import { useCVExperienceById } from "@/hooks/use-cv-data";

const ExperienceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: experience, isLoading } = useCVExperienceById(id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!experience) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-4">Experience not found</p>
          <Link to="/" className="text-sm text-primary hover:underline">← Back to CV</Link>
        </div>
      </div>
    );
  }

  const categorizedSkills = {
    programming: experience.programming_skills || [],
    tools: experience.tool_skills || [],
    skills: experience.domain_skills || [],
  };

  const projectProgramming = experience.related_projects.flatMap((p) => p.programming_skills || []);
  const projectTools = experience.related_projects.flatMap((p) => p.tool_skills || []);
  const projectDomainSkills = experience.related_projects.flatMap((p) => p.domain_skills || []);

  const allCategorizedSkills = {
    programming: [...new Set([...categorizedSkills.programming, ...projectProgramming])],
    tools: [...new Set([...categorizedSkills.tools, ...projectTools])],
    skills: [...new Set([...categorizedSkills.skills, ...projectDomainSkills])],
  };

  const hasCategories =
    allCategorizedSkills.programming.length > 0 ||
    allCategorizedSkills.tools.length > 0 ||
    allCategorizedSkills.skills.length > 0;

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

        <header className="mb-10">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-1">
            {experience.role}
          </h1>
          <p className="text-lg text-muted-foreground mb-3">
            {experience.company}
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5" />
              <span>{experience.period}</span>
            </div>
            {experience.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>{experience.location}</span>
              </div>
            )}
          </div>
          {experience.description && (
            <p className="text-muted-foreground leading-relaxed max-w-2xl">
              {experience.description}
            </p>
          )}
        </header>

        {experience.related_projects.length > 0 && (
          <Section title="Projects">
            <div className="grid md:grid-cols-2 gap-5">
              {experience.related_projects.map((project) => (
                <Link
                  key={project.id}
                  to={`/project/${project.slug || project.id}`}
                  className="group block bg-card border border-border rounded hover:border-primary/40 hover:shadow-sm transition-all duration-200"
                >
                  <div className="border-l-2 border-primary p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                        {project.title}
                      </h4>
                      <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 ml-2" />
                    </div>
                    {project.description && (
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">{project.description}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </Section>
        )}

        {hasCategories && (
          <Section title="Technical Stack">
            <div className="grid md:grid-cols-3 gap-6">
              {allCategorizedSkills.programming.length > 0 && (
                <SkillGroup label="Languages" items={allCategorizedSkills.programming} />
              )}
              {allCategorizedSkills.tools.length > 0 && (
                <SkillGroup label="Tools & Frameworks" items={allCategorizedSkills.tools} />
              )}
              {allCategorizedSkills.skills.length > 0 && (
                <SkillGroup label="Domain Expertise" items={allCategorizedSkills.skills} />
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

export default ExperienceDetail;
