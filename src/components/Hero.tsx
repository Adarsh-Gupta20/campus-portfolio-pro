import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-transparent" />
      <div className="absolute top-20 right-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      
      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                🎓 Transforming Higher Education
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Centralized Student{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Achievement Hub
                </span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Streamline student activities, build digital portfolios, and ensure academic success 
                with our comprehensive platform for Higher Education Institutions.
              </p>
            </div>

            <div className="space-y-3">
              {[
                "Verified digital portfolio generation",
                "Automated attendance tracking & alerts", 
                "Comprehensive achievement management",
                "NAAC accreditation support"
              ].map((feature) => (
                <div key={feature} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                  <span className="text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="gradient-primary text-white group">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                Schedule Demo
              </Button>
            </div>

            <div className="flex items-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-primary">500+</span>
                <span>Institutions</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-primary">50,000+</span>
                <span>Students</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-primary">99.9%</span>
                <span>Uptime</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative bg-card rounded-2xl p-8 shadow-elevated">
              <div className="space-y-6">
                <div className="stats-card">
                  <h3 className="text-lg font-semibold mb-2">Student Progress</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Academic Activities</span>
                      <span className="font-bold">85%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-white rounded-full h-2 w-[85%]"></div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="achievement-card">
                    <div className="text-2xl font-bold text-success">42</div>
                    <div className="text-sm text-muted-foreground">Achievements</div>
                  </div>
                  <div className="achievement-card">
                    <div className="text-2xl font-bold text-primary">95%</div>
                    <div className="text-sm text-muted-foreground">Attendance</div>
                  </div>
                </div>

                <div className="achievement-card">
                  <h4 className="font-semibold mb-2">Recent Activities</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span>Leadership Workshop Completed</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>Research Project Submitted</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span>Community Service Recorded</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;