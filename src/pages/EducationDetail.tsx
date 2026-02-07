import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Calendar } from "lucide-react";
import GeometricBackground from "@/components/GeometricBackground";
import { useCVEducationById } from "@/hooks/use-cv-data";

const EducationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: education, isLoading } = useCVEducationById(id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!education) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-4">Education not found</p>
          <Link to="/" className="text-sm text-primary hover:underline">← Back to CV</Link>
        </div>
      </div>
    );
  }

  const projectProgramming = education.related_projects.flatMap((p) => p.programming_skills || []);
  const projectTools = education.related_projects.flatMap((p) => p.tool_skills || []);
  const projectDomainSkills = education.related_projects.flatMap((p) => p.domain_skills || []);

  const eduProgramming = (education as any).programming_skills || [];
  const eduTools = (education as any).tool_skills || [];
  const eduSkills = (education as any).domain_skills || [];

  const combinedProgramming = [...new Set([...projectProgramming, ...eduProgramming])];
  const combinedTools = [...new Set([...projectTools, ...eduTools])];
  const combinedSkills = [...new Set([...projectDomainSkills, ...eduSkills])];

  const hasCombinedStack =
    combinedProgramming.length > 0 || combinedTools.length > 0 || combinedSkills.length > 0;

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
          <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">
            Education
          </p>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-1">
            {education.degree}
          </h1>
          <p className="text-lg text-muted-foreground mb-3">
            {education.institution}
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5" />
              <span>{education.year}</span>
            </div>
            {education.location && <span>{education.location}</span>}
          </div>
          {education.specialization && (
            <p className="text-muted-foreground text-sm">
              <span className="text-xs font-semibold text-primary uppercase tracking-widest">Specialization: </span>
              {education.specialization}
            </p>
          )}
          {education.thesis && (
            <p className="text-muted-foreground text-sm mt-2">
              <span className="text-xs font-semibold text-primary uppercase tracking-widest">Thesis: </span>
              {education.thesis}
            </p>
          )}
        </header>

        {education.related_projects.length > 0 && (
          <Section title="Projects">
            <div className="grid md:grid-cols-2 gap-5">
              {education.related_projects.map((project) => (
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

        {education.structured_coursework && education.structured_coursework.length > 0 && (
          <Section title="Coursework">
            <ul className="space-y-1.5">
              {education.structured_coursework.map((course) => (
                <li key={course.id} className="text-sm text-muted-foreground flex gap-3">
                  <span className="text-primary font-bold">—</span>
                  {course.name}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {hasCombinedStack && (
          <Section title="Technical Stack">
            <div className="grid md:grid-cols-3 gap-6">
              {combinedProgramming.length > 0 && (
                <SkillGroup label="Languages" items={combinedProgramming} />
              )}
              {combinedTools.length > 0 && (
                <SkillGroup label="Tools & Frameworks" items={combinedTools} />
              )}
              {combinedSkills.length > 0 && (
                <SkillGroup label="Domain Expertise" items={combinedSkills} />
              )}
            </div>
          </Section>
        )}

        <footer className="mt-16 pt-6 border-t border-border text-center">
          <Link to="/" className="text-xs text-muted-foreground hover:text-primary transition-colors">
            ← Back to CV
          </Link>
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

export default EducationDetail;
