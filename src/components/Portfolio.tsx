import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Download, 
  Share, 
  Star,
  Calendar,
  MapPin,
  Mail,
  Phone,
  ExternalLink
} from "lucide-react";

const Portfolio = () => {
  return (
    <section id="portfolio" className="py-20 bg-gradient-secondary">
      <div className="container">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="secondary" className="px-4 py-2">
            Digital Portfolio
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold">
            Professional{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Student Portfolios
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Auto-generated comprehensive portfolios that showcase student achievements, 
            skills, and experiences in a professional format ready for employers.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Portfolio Preview */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header Card */}
            <Card className="overflow-hidden">
              <div className="h-32 bg-gradient-to-r from-primary to-accent"></div>
              <CardContent className="relative pt-0 pb-6">
                <div className="flex flex-col md:flex-row items-start md:items-end space-y-4 md:space-y-0 md:space-x-6 -mt-16">
                  <div className="w-24 h-24 bg-card rounded-xl border-4 border-background shadow-lg flex items-center justify-center">
                    <User className="h-10 w-10 text-primary" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="text-2xl font-bold">Priya Sharma</h3>
                    <p className="text-muted-foreground">Computer Science Engineering • Final Year</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">Full Stack Developer</Badge>
                      <Badge variant="secondary">AI/ML Enthusiast</Badge>
                      <Badge variant="secondary">Team Leader</Badge>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Share className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                    <Button size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>priya.sharma@university.edu</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>+91 98765 43210</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>Mumbai, Maharashtra</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    <span>github.com/priyasharma</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-warning" />
                  <span>Key Achievements</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    title: "Best Innovation Award - Tech Fest 2024",
                    description: "Developed AI-powered student attendance system using facial recognition",
                    date: "March 2024",
                    category: "Competition"
                  },
                  {
                    title: "Google Summer of Code Participant", 
                    description: "Contributed to open-source machine learning libraries",
                    date: "Summer 2023",
                    category: "Internship"
                  },
                  {
                    title: "Student Council President",
                    description: "Led student body of 3000+ students, organized 15+ events",
                    date: "2023-2024",
                    category: "Leadership"
                  },
                  {
                    title: "Research Publication - IEEE Conference",
                    description: "Published paper on 'Smart Campus IoT Systems'",
                    date: "December 2023",
                    category: "Research"
                  }
                ].map((achievement, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-start justify-between">
                      <h4 className="font-medium">{achievement.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        {achievement.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{achievement.date}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Skills & Stats Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Academic Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-primary">8.7</div>
                  <div className="text-sm text-muted-foreground">CGPA</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Attendance</span>
                    <span className="font-medium">96%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Projects Completed</span>
                    <span className="font-medium">24</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Certifications</span>
                    <span className="font-medium">8</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Top Skills</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { skill: "React.js", level: "Expert" },
                  { skill: "Python", level: "Advanced" },
                  { skill: "Machine Learning", level: "Intermediate" },
                  { skill: "Leadership", level: "Expert" },
                  { skill: "Project Management", level: "Advanced" }
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm font-medium">{item.skill}</span>
                    <Badge variant={item.level === 'Expert' ? 'default' : 'secondary'} className="text-xs">
                      {item.level}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Activity Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-xl font-bold text-primary">42</div>
                      <div className="text-xs text-muted-foreground">Total Activities</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-success">156</div>
                      <div className="text-xs text-muted-foreground">Skill Points</div>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <div className="text-sm text-muted-foreground mb-2">Portfolio Completeness</div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-gradient-to-r from-primary to-accent rounded-full h-2 w-[92%]"></div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">92% Complete</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;