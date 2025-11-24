/* src/components/Projects.tsx */
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Construction, LineChart, LayoutDashboard, Target } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/locales/translations";

const Projects = () => {
  const { language } = useLanguage();
  const t = translations[language].projects;

  const projects = [
    {
      title: t.revenue.title,
      category: t.revenue.category,
      icon: LineChart,
      tags: t.revenue.tags
    },
    {
      title: t.dashboard.title,
      category: t.dashboard.category,
      icon: LayoutDashboard,
      tags: t.dashboard.tags
    },
    {
      title: t.strategy.title,
      category: t.strategy.category,
      icon: Target,
      tags: t.strategy.tags
    }
  ];

  return (
    <section id="projects" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
              {t.title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
              {t.subtitle}
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full border border-accent/20">
              <Construction className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-accent">{t.construction}</span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project, index) => {
              const Icon = project.icon;
              return (
                <Card 
                  key={index}
                  className="group border border-white/10 shadow-card hover:shadow-hover hover:-translate-y-2 transition-all duration-500 relative overflow-hidden bg-card/50 backdrop-blur-md hover:border-accent/50 rounded-2xl"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {/* Decorative gradient blob */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/3 group-hover:bg-accent/10 transition-colors duration-500 blur-3xl" />
                  
                  <CardHeader className="pb-4 relative z-10">
                    <div className="mb-4">
                      <div className="p-3 rounded-xl bg-accent/10 inline-block group-hover:bg-accent/20 transition-colors duration-300">
                        <Icon className="h-7 w-7 text-accent" />
                      </div>
                    </div>
                    <CardTitle className="text-2xl mb-2 font-bold">{project.title}</CardTitle>
                    <CardDescription className="text-base font-medium text-muted-foreground/80">
                      {project.category}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-6 relative z-10">
                    <div className="flex items-center gap-2 text-accent bg-accent/10 px-4 py-3 rounded-lg border border-accent/20">
                      <Construction className="h-4 w-4" />
                      <span className="text-sm font-medium">{t.comingSoon}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, idx) => (
                        <Badge 
                          key={idx} 
                          variant="secondary"
                          className="bg-secondary text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;