import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Construction, LineChart, LayoutDashboard, Target } from "lucide-react";

const projects = [
  {
    title: "Revenue Prediction Model",
    category: "Machine Learning & Econometrics",
    icon: LineChart,
    tags: ["Python", "ML", "Forecasting"]
  },
  {
    title: "Executive Dashboard",
    category: "Business Intelligence",
    icon: LayoutDashboard,
    tags: ["SQL", "Visualization", "KPIs"]
  },
  {
    title: "Market Strategy Analysis",
    category: "Strategic Consulting",
    icon: Target,
    tags: ["Data Analysis", "Strategy", "Insights"]
  }
];

const Projects = () => {
  return (
    <section id="projects" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Featured Projects
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
              Applying advanced ML & Econometrics to business cases
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full border border-accent/20">
              <Construction className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-accent">Portfolio Under Construction</span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((project, index) => {
              const Icon = project.icon;
              return (
                <Card 
                  key={index}
                  className="shadow-card hover:shadow-hover transition-all duration-300 border-border/50 hover:border-accent/30 relative overflow-hidden animate-in fade-in slide-in-from-bottom-4"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -translate-y-16 translate-x-16" />
                  
                  <CardHeader className="pb-4">
                    <div className="mb-3">
                      <div className="p-3 rounded-lg bg-primary/10 inline-block">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <CardTitle className="text-xl mb-2">{project.title}</CardTitle>
                    <CardDescription className="text-base">
                      {project.category}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2 text-muted-foreground bg-muted/50 px-4 py-3 rounded-lg border border-border/30">
                      <Construction className="h-4 w-4" />
                      <span className="text-sm font-medium">🚧 Coming Soon / In Development</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, idx) => (
                        <Badge 
                          key={idx} 
                          variant="outline"
                          className="border-border/50 text-muted-foreground"
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
