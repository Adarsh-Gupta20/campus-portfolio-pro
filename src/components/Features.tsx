import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Award, 
  Calendar, 
  FileText, 
  TrendingUp, 
  Shield, 
  Bell, 
  Users, 
  BarChart3 
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Award,
      title: "Achievement Tracking",
      description: "Comprehensive recording and verification of academic achievements, co-curricular activities, and leadership roles.",
      benefits: ["Digital certificates", "Skill mapping", "Progress tracking"],
      color: "success"
    },
    {
      icon: Calendar,
      title: "Smart Attendance",
      description: "Automated attendance monitoring with real-time alerts to students and parents for academic eligibility.",
      benefits: ["Real-time alerts", "Parent notifications", "Eligibility tracking"],
      color: "primary"
    },
    {
      icon: FileText,
      title: "Digital Portfolio",
      description: "Auto-generated comprehensive portfolios showcasing student achievements and skills for career readiness.",
      benefits: ["Auto-generation", "Professional format", "Career ready"],
      color: "accent"
    },
    {
      icon: TrendingUp,
      title: "Skill Analytics",
      description: "Advanced analytics to track skill development and identify areas for improvement and growth opportunities.",
      benefits: ["Skill insights", "Growth tracking", "Recommendations"],
      color: "warning"
    },
    {
      icon: Shield,
      title: "Verification System",
      description: "Blockchain-backed verification system ensuring authenticity and preventing fraudulent records.",
      benefits: ["Blockchain security", "Fraud prevention", "Trusted records"],
      color: "primary"
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description: "Proactive notifications for deadlines, opportunities, and critical academic milestones.",
      benefits: ["Deadline alerts", "Opportunities", "Milestone tracking"],
      color: "accent"
    },
    {
      icon: Users,
      title: "Multi-Stakeholder",
      description: "Seamless collaboration between students, faculty, parents, and administrative staff.",
      benefits: ["Role-based access", "Collaboration tools", "Communication hub"],
      color: "success"
    },
    {
      icon: BarChart3,
      title: "NAAC Reporting",
      description: "Automated generation of reports for NAAC accreditation and other institutional requirements.",
      benefits: ["NAAC compliance", "Auto reports", "Data insights"],
      color: "primary"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      success: "text-success bg-success/10",
      primary: "text-primary bg-primary/10",
      accent: "text-accent bg-accent/10",
      warning: "text-warning bg-warning/10"
    };
    return colors[color as keyof typeof colors] || colors.primary;
  };

  return (
    <section id="features" className="py-20 bg-gradient-secondary">
      <div className="container">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="secondary" className="px-4 py-2">
            Platform Features
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold">
            Everything You Need for{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Student Success
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive platform addresses all challenges in student activity management 
            and portfolio development for Higher Education Institutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <Card key={feature.title} className="group hover:shadow-elevated transition-all duration-300 border-0 bg-card/80 backdrop-blur">
                <CardHeader className="space-y-3">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(feature.color)}`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="space-y-2">
                    {feature.benefits.map((benefit) => (
                      <div key={benefit} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                        <span className="text-xs text-muted-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;