/* src/components/Projects.tsx */
import { useRef, useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Construction, LineChart, LayoutDashboard, Database, Code2, CheckCircle,
  GraduationCap, Github, Sparkles, ExternalLink, Briefcase, FileText, Download
} from "lucide-react";
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/locales/translations";
import { gsap } from "@/lib/gsap";
import { useMouseGlow } from "@/hooks/useMouseGlow";
import {
  Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const GITHUB_URL = "https://github.com/kikobatistaa/Using-Databricks-to-Predict-Traffic-and-Analyse-Spotify-Playlists";
const VW_PDF_URL = "/Strategy_VW.pdf";
const BANK_REPORT_URL = "/Bank_Profitability_Report.pdf";
const BID_REPORT_URL = "/report_BID.pdf";

const Projects = () => {
  const { language } = useLanguage();
  const t = translations[language].projects;
  const headingRef = useRef<HTMLDivElement>(null);
  const { onMouseMove } = useMouseGlow();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const projects = [
    { title: t.volkswagen.title, category: t.volkswagen.category, icon: Briefcase, tags: t.volkswagen.tags, isLive: true, isAcademic: true, academicBadge: "Strategy Consultant", grade: "Final Project", isCaseStudy: true, caseStudyData: t.volkswagen.caseStudy, buttons: t.volkswagen.buttons, pdfUrl: VW_PDF_URL },
    { title: t.bank.title, category: t.bank.category, icon: LineChart, tags: t.bank.tags, isLive: true, isAcademic: true, academicBadge: t.bank.academicBadge, grade: t.bank.grade, isCaseStudy: true, caseStudyData: t.bank.caseStudy, buttons: t.bank.buttons, pdfUrl: BANK_REPORT_URL },
    { title: t.bid.title, category: t.bid.category, icon: LineChart, tags: t.bid.tags, isLive: true, isAcademic: true, academicBadge: t.bid.academicBadge, grade: t.bid.grade, isCaseStudy: true, caseStudyData: t.bid.caseStudy, buttons: t.bid.buttons, pdfUrl: BID_REPORT_URL },
    { title: t.sparkAnalytics.title, category: t.sparkAnalytics.category, icon: Database, tags: t.sparkAnalytics.tags, isLive: true, isAcademic: true, academicBadge: t.sparkAnalytics.academicBadge, grade: t.sparkAnalytics.grade, buttons: t.sparkAnalytics.buttons, isCaseStudy: false },
    { title: t.revenue.title, category: t.revenue.category, icon: LineChart, tags: t.revenue.tags, isLive: false, isAcademic: false, isCaseStudy: false },
    { title: t.dashboard.title, category: t.dashboard.category, icon: LayoutDashboard, tags: t.dashboard.tags, isLive: false, isAcademic: false, isCaseStudy: false },
    { title: t.portfolio.title, category: t.portfolio.category, icon: Code2, tags: t.portfolio.tags, isLive: true, isAcademic: false, isCaseStudy: false },
  ];

  // Heading fade-in animation
  useEffect(() => {
    if (!headingRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current!.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 85%" },
        }
      );
    }, headingRef);
    return () => ctx.revert();
  }, []);

  // Carousel dot indicators
  const onApiChange = useCallback(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
  }, [api]);

  useEffect(() => {
    if (!api) return;
    onApiChange();
    api.on("select", onApiChange);
    api.on("reInit", onApiChange);
    return () => {
      api.off("select", onApiChange);
      api.off("reInit", onApiChange);
    };
  }, [api, onApiChange]);

  return (
    <section id="projects" className="py-24 bg-secondary/30 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div ref={headingRef} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">{t.title}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">{t.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-7xl">
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: false,
          }}
          className="w-full"
        >
          <CarouselContent>
            {projects.map((project, index) => {
              const Icon = project.icon;
              const isSparkProject = project.title === t.sparkAnalytics.title;
              const isCaseStudyProject = project.isCaseStudy;

              return (
                <CarouselItem
                  key={index}
                  className="basis-full md:basis-1/2 lg:basis-1/3"
                >
                  <Card
                    className="project-card card-mouse-glow group border border-white/10 shadow-card hover:shadow-hover hover:-translate-y-2 transition-all duration-500 relative overflow-hidden bg-card/50 backdrop-blur-md hover:border-accent/50 rounded-2xl flex flex-col h-full"
                    onMouseMove={onMouseMove}
                  >
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
                          <Icon className={`h-7 w-7 ${project.isLive ? "text-[hsl(var(--gold))]" : "text-accent"}`} />
                        </div>
                      </div>
                      <CardTitle className="text-2xl mb-2 font-bold">{project.title}</CardTitle>
                      <CardDescription className="text-base font-medium text-muted-foreground/80">{project.category}</CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4 relative z-10 flex-grow flex flex-col">
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

                      <div className="flex flex-wrap gap-2 mt-auto pt-2">
                        {isCaseStudyProject && project.caseStudyData && (
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
                                <DialogDescription className="text-base mt-2">{project.category}</DialogDescription>
                              </DialogHeader>
                              <ScrollArea className="flex-grow pr-4">
                                <div className="space-y-6 py-4">
                                  <div className="space-y-2">
                                    <h4 className="font-bold text-foreground text-lg">1. The Challenge</h4>
                                    <p className="text-muted-foreground leading-relaxed">{project.caseStudyData.challenge}</p>
                                  </div>
                                  <div className="space-y-2">
                                    <h4 className="font-bold text-foreground text-lg">2. Strategic Approach</h4>
                                    <div className="text-muted-foreground leading-relaxed whitespace-pre-line">{project.caseStudyData.approach}</div>
                                  </div>
                                  <div className="space-y-2">
                                    <h4 className="font-bold text-foreground text-lg">3. My Contribution</h4>
                                    <p className="text-muted-foreground leading-relaxed">{project.caseStudyData.contribution}</p>
                                  </div>
                                  <div className="p-4 bg-secondary/50 rounded-lg border border-border/50">
                                    <h4 className="font-bold text-[hsl(var(--gold))] text-lg mb-2">4. Key Recommendation</h4>
                                    <p className="text-foreground font-medium leading-relaxed">{project.caseStudyData.recommendation}</p>
                                  </div>
                                  <div className="pt-4 border-t border-border/50">
                                    <p className="text-xs text-muted-foreground italic">{project.caseStudyData.credits}</p>
                                  </div>
                                </div>
                              </ScrollArea>
                              <div className="pt-4 mt-auto">
                                <Button className="w-full gap-2" onClick={() => window.open(project.pdfUrl, "_blank")}>
                                  <Download className="h-4 w-4" />
                                  {project.buttons?.downloadDeck}
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        )}

                        {isSparkProject && project.buttons && (
                          <>
                            <Button variant="outline" size="sm" className="gap-1.5 text-xs flex-1" onClick={() => window.open(GITHUB_URL, "_blank")}>
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
                          <Badge key={idx} variant="secondary" className="bg-secondary text-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-4 lg:-left-6" />
          <CarouselNext className="hidden md:flex -right-4 lg:-right-6" />
        </Carousel>

        {/* Dot indicators */}
        {count > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: count }).map((_, i) => (
              <button
                key={i}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  i === current ? "bg-[hsl(var(--gold))] w-6" : "bg-muted-foreground/30 w-2"
                )}
                onClick={() => api?.scrollTo(i)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
