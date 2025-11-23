/* src/components/Experience.tsx */
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
    <section id="experience" className="py-24 bg-background relative overflow-hidden">
      {/* Abstract Background Element */}
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-50" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
              Professional Experience
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Driving impact through data-driven insights and strategic execution
            </p>
          </div>
          
          <div className="space-y-8">
            {experiences.map((exp, index) => {
              const Icon = exp.icon;
              return (
                <Card 
                  key={index}
                  className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 bg-secondary/20 hover:bg-secondary/40"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <CardHeader className="pb-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start gap-5">
                        <div className="p-3 rounded-xl bg-white shadow-sm border border-border/50">
                          <Icon className="h-6 w-6 text-accent" />
                        </div>
                        <div>
                          <CardTitle className="text-2xl mb-2 font-bold">{exp.role}</CardTitle>
                          <CardDescription className="text-base font-medium">
                            <span className="text-foreground">{exp.company}</span>
                          </CardDescription>
                        </div>
                      </div>
                      <Badge variant="outline" className="w-fit px-4 py-1 text-sm border-accent/20 text-accent bg-accent/5">
                        {exp.period}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pl-20">
                    <ul className="space-y-3 mb-6">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                          <div className="mt-2 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                          <span className="text-base leading-relaxed">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, idx) => (
                        <Badge 
                          key={idx} 
                          variant="secondary"
                          className="bg-background text-muted-foreground hover:text-foreground border border-transparent hover:border-border transition-all"
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