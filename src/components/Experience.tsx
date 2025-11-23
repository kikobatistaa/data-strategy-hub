import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, TrendingUp, Users, Code } from "lucide-react";

const experiences = [
  {
    company: "NetJets Europe",
    role: "Business Analyst Intern",
    period: "2024",
    icon: Briefcase,
    achievements: [
      "Analyzed sales data to identify significant revenue leakage opportunities",
      "Automated manual inventory reconciliation using SQL & Python, saving ~10 hours/week",
      "Developed client segmentation for targeted marketing initiatives"
    ],
    skills: ["SQL", "Python", "Data Analysis", "Revenue Optimization"]
  },
  {
    company: "NOVAe",
    role: "Co-Founder & Head of Marketing",
    period: "2023 - Present",
    icon: Users,
    achievements: [
      "Co-founded the university's first entrepreneurship hub",
      "Grew membership to 20+ active members and secured industry speakers in Year 1",
      "Developed strategic partnerships with leading tech companies"
    ],
    skills: ["Entrepreneurship", "Strategic Marketing", "Community Building", "Leadership"]
  },
  {
    company: "Happy Code Oriente",
    role: "Tech Educator",
    period: "2022 - 2023",
    icon: Code,
    achievements: [
      "Taught Python & Algorithms to 50+ students aged 8-16",
      "Designed curriculum combining computational thinking with practical applications",
      "Achieved 95% student satisfaction rate across all courses"
    ],
    skills: ["Python", "Teaching", "Curriculum Design", "Communication"]
  }
];

const Experience = () => {
  return (
    <section id="experience" className="py-24 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Professional Experience
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Driving impact through data-driven insights and strategic execution
            </p>
          </div>
          
          <div className="space-y-6">
            {experiences.map((exp, index) => {
              const Icon = exp.icon;
              return (
                <Card 
                  key={index}
                  className="shadow-card hover:shadow-hover transition-all duration-300 border-border/50 hover:border-accent/30 animate-in fade-in slide-in-from-bottom-4"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-primary/10">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-2xl mb-1">{exp.role}</CardTitle>
                          <CardDescription className="text-base">
                            <span className="font-semibold text-foreground">{exp.company}</span>
                            <span className="mx-2">•</span>
                            <span>{exp.period}</span>
                          </CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-3">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-foreground/80">
                          <TrendingUp className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                          <span className="text-base leading-relaxed">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {exp.skills.map((skill, idx) => (
                        <Badge 
                          key={idx} 
                          variant="secondary"
                          className="bg-secondary hover:bg-accent/10 text-foreground border border-border/50"
                        >
                          {skill}
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

export default Experience;
