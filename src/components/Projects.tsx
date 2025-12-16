/* src/components/Projects.tsx */
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Construction, 
  LineChart, 
  LayoutDashboard, 
  Database, 
  Code2, 
  CheckCircle, 
  GraduationCap, 
  Github, 
  Sparkles, 
  ExternalLink,
  Briefcase,
  FileText,
  Download
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/locales/translations";
import { useOnScreen } from "@/hooks/useOnScreen";

const GITHUB_URL = "https://github.com/kikobatistaa/Using-Databricks-to-Predict-Traffic-and-Analyse-Spotify-Playlists";
// This path works if Strategy_VW.pdf is inside the "public" folder
const VW_PDF_URL = "/Strategy_VW.pdf"; 

const Projects = () => {
  const { language } = useLanguage();
  const t = translations[language].projects;
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useOnScreen(sectionRef, "0px", 0.2);

  const projects = [
    {
      title: t.volkswagen.title,
      category: t.volkswagen.category,
      icon: Briefcase,
      tags: t.volkswagen.tags,
      isLive: true,
      isAcademic: true,
      academicBadge: "Strategy Consultant", 
      grade: "Final Project",
      isCaseStudy: true,
      caseStudyData: t.volkswagen.caseStudy,
      buttons: t.volkswagen.buttons
    },
    {
      title: t.sparkAnalytics.title,
      category: t.sparkAnalytics.category,
      icon: Database,
      tags: t.sparkAnalytics.tags,
      isLive: true,
      isAcademic: true,
      academicBadge: t.sparkAnalytics.academicBadge,
      grade: t.sparkAnalytics.grade,
      buttons: t.sparkAnalytics.buttons
    },
    {
      title: t.revenue.title,
      category: t.revenue.category,
      icon: LineChart,
      tags: t.revenue.tags,
      isLive: false,
      isAcademic: false
    },
    {
      title: t.dashboard.title,
      category: t.dashboard.category,
      icon: LayoutDashboard,
      tags: t.dashboard.tags,
      isLive: false,
      isAcademic: false
    },
    {
      title: t.portfolio.title,
      category: t.portfolio.category,
      icon: Code2,
      tags: t.portfolio.tags,
      isLive: true,
      isAcademic: false
    }
  ];

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className={`py-24 bg-secondary/30 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
              {t.title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
              {t.subtitle}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {projects.map((project, index) => {
              const Icon = project.icon;
              const isSparkProject = project.title === t.sparkAnalytics.title; 
              const isVWProject = project.isCaseStudy;

              return (
                <Card 
                  key={index}
                  className={`group border border-white/10 shadow-card hover:shadow-hover hover:-translate-y-2 transition-all duration-500 relative overflow-hidden bg-card/50 backdrop-blur-md hover:border-accent/50 rounded-2xl flex flex-col ${isVWProject ? 'md:col-span-2 lg:col-span-1' : ''}`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {/* Decorative gradient blob */}
                  <div className={`absolute top-0 right-0 w-64 h-64 rounded-full -translate-y-1/2 translate-x-1/3 transition-colors duration-500 blur-3xl ${
                    project.isLive 
                      ? "bg-[hsl(var(--gold))]/5 group-hover:bg-[hsl(var(--gold))]/10"
                      : "bg-accent/5 group-hover:bg-accent/10"
                  }`} />
                  
                  <CardHeader className="pb-4 relative z-10">
                    <div className="mb-4">
                      <div className={`p-3 rounded-xl inline-block transition-colors duration-300 ${
                        project.isLive 
                          ? "bg-[hsl(var(--gold))]/10 group-hover:bg-[hsl(var(--gold))]/20"
                          : "bg-accent/10 group-hover:bg-accent/20"
                      }`}>
                        <Icon className={`h-7 w-7 ${
                          project.isLive 
                            ? "text-[hsl(var(--gold))]" 
                            : "text-accent"
                        }`} />
                      </div>
                    </div>
                    <CardTitle className="text-2xl mb-2 font-bold">{project.title}</CardTitle>
                    <CardDescription className="text-base font-medium text-muted-foreground/80">
                      {project.category}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4 relative z-10 flex-grow flex flex-col">
                    {/* Badges */}
                    {project.isAcademic && project.academicBadge && (
                      <div className="flex items-center gap-2 text-[hsl(var(--gold))] bg-[hsl(var(--gold))]/10 px-4 py-3 rounded-lg border border-[hsl(var(--gold))]/20">
                        <GraduationCap className="h-4 w-4 flex-shrink-0" />
                        <span className="text-sm font-medium">
                          {project.academicBadge}{" "}
                          <span className="text-gold-shimmer font-bold inline-flex items-center gap-1">
                            • {project.grade}
                            <Sparkles className="h-3.5 w-3.5 text-[hsl(var(--gold-light))]" />
                          </span>
                        </span>
                      </div>
                    )}

                    {!project.isAcademic && (
                      project.isLive ? (
                        <div className="flex items-center gap-2 text-green-500 bg-green-500/10 px-4 py-3 rounded-lg border border-green-500/20">
                          <CheckCircle className="h-4 w-4" />
                          <span className="text-sm font-medium">{t.youreHere}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-accent bg-accent/10 px-4 py-3 rounded-lg border border-accent/20">
                          <Construction className="h-4 w-4" />
                          <span className="text-sm font-medium">{t.comingSoon}</span>
                        </div>
                      )
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2 mt-auto pt-2">
                      {isVWProject && project.caseStudyData && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="default" size="sm" className="w-full gap-2 bg-[hsl(var(--gold))] hover:bg-[hsl(var(--gold))]/90 text-primary-foreground font-bold">
                              <FileText className="h-4 w-4" />
                              {project.buttons?.caseStudy}
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
                            <DialogHeader>
                              <DialogTitle className="text-2xl font-bold">{project.caseStudyData.title}</DialogTitle>
                              <DialogDescription className="text-base mt-2">
                                {project.category}
                              </DialogDescription>
                            </DialogHeader>
                            <ScrollArea className="flex-grow pr-4">
                              <div className="space-y-6 py-4">
                                <div className="space-y-2">
                                  <h4 className="font-bold text-foreground text-lg">1. The Challenge</h4>
                                  <p className="text-muted-foreground leading-relaxed">
                                    {project.caseStudyData.challenge}
                                  </p>
                                </div>
                                <div className="space-y-2">
                                  <h4 className="font-bold text-foreground text-lg">2. Strategic Approach</h4>
                                  <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                                    {project.caseStudyData.approach}
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <h4 className="font-bold text-foreground text-lg">3. My Contribution</h4>
                                  <p className="text-muted-foreground leading-relaxed">
                                    {project.caseStudyData.contribution}
                                  </p>
                                </div>
                                <div className="p-4 bg-secondary/50 rounded-lg border border-border/50">
                                  <h4 className="font-bold text-[hsl(var(--gold))] text-lg mb-2">4. Key Recommendation</h4>
                                  <p className="text-foreground font-medium leading-relaxed">
                                    {project.caseStudyData.recommendation}
                                  </p>
                                </div>
                                <div className="pt-4 border-t border-border/50">
                                  <p className="text-xs text-muted-foreground italic">
                                    {project.caseStudyData.credits}
                                  </p>
                                </div>
                              </div>
                            </ScrollArea>
                            <div className="pt-4 mt-auto">
                              <Button 
                                className="w-full gap-2" 
                                onClick={() => window.open(VW_PDF_URL, "_blank")}
                              >
                                <Download className="h-4 w-4" />
                                {project.buttons?.downloadDeck}
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      )}

                      {isSparkProject && project.buttons && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-1.5 text-xs flex-1"
                            onClick={() => window.open(GITHUB_URL, "_blank")}
                          >
                            <Github className="h-3.5 w-3.5" />
                            {project.buttons.github}
                          </Button>
                          <Link to="/projects/spark-analytics/traffic" className="flex-1">
                            <Button variant="outline" size="sm" className="gap-1.5 text-xs w-full">
                              <ExternalLink className="h-3.5 w-3.5" />
                              {project.buttons.traffic}
                            </Button>
                          </Link>
                        </>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-2 pt-2">
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