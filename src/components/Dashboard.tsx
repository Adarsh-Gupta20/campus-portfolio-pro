import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Award, 
  TrendingUp, 
  Users, 
  BookOpen, 
  Clock,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

const Dashboard = () => {
  return (
    <section id="dashboard" className="py-20">
      <div className="container">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="outline" className="px-4 py-2">
            Student Dashboard
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold">
            Comprehensive{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Activity Overview
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real-time insights into student progress, achievements, and academic performance 
            with intuitive dashboards for all stakeholders.
          </p>
        </div>

        <div className="space-y-8">
          {/* Stats Overview */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="stats-card">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <Award className="h-8 w-8 text-white" />
                  <div>
                    <div className="text-2xl font-bold text-white">42</div>
                    <div className="text-sm text-white/80">Total Achievements</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-success to-success/80 text-success-foreground">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-8 w-8 text-white" />
                  <div>
                    <div className="text-2xl font-bold text-white">95%</div>
                    <div className="text-sm text-white/80">Attendance Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-accent to-accent/80 text-accent-foreground">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="h-8 w-8 text-white" />
                  <div>
                    <div className="text-2xl font-bold text-white">8.5</div>
                    <div className="text-sm text-white/80">CGPA</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-warning to-warning/80 text-warning-foreground">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <Users className="h-8 w-8 text-white" />
                  <div>
                    <div className="text-2xl font-bold text-white">12</div>
                    <div className="text-sm text-white/80">Active Projects</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Dashboard Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Recent Activities */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <span>Recent Activities</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    title: "Research Paper Submission",
                    type: "Academic",
                    date: "2024-01-15",
                    status: "completed",
                    points: "+25 points"
                  },
                  {
                    title: "Leadership Workshop",
                    type: "Co-curricular",
                    date: "2024-01-12",
                    status: "completed",
                    points: "+15 points"
                  },
                  {
                    title: "Community Service Drive", 
                    type: "Social",
                    date: "2024-01-10",
                    status: "pending",
                    points: "Pending verification"
                  },
                  {
                    title: "Technical Hackathon",
                    type: "Competition",
                    date: "2024-01-08",
                    status: "completed",
                    points: "+30 points"
                  }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border bg-card/50">
                    <div className="flex items-center space-x-4">
                      <div className={`w-2 h-8 rounded-full ${
                        activity.status === 'completed' ? 'bg-success' : 'bg-warning'
                      }`}></div>
                      <div>
                        <h4 className="font-medium">{activity.title}</h4>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Badge variant="outline" className="text-xs">
                            {activity.type}
                          </Badge>
                          <span>•</span>
                          <span>{activity.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {activity.status === 'completed' ? (
                        <CheckCircle2 className="h-4 w-4 text-success" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-warning" />
                      )}
                      <span className="text-sm font-medium">{activity.points}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Progress Tracking */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Skill Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {[
                    { skill: "Leadership", progress: 85, color: "bg-primary" },
                    { skill: "Communication", progress: 92, color: "bg-success" },
                    { skill: "Technical Skills", progress: 78, color: "bg-accent" },
                    { skill: "Research", progress: 88, color: "bg-warning" }
                  ].map((item) => (
                    <div key={item.skill} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{item.skill}</span>
                        <span className="text-muted-foreground">{item.progress}%</span>
                      </div>
                      <Progress value={item.progress} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>Upcoming Deadlines</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { task: "Project Report", due: "Jan 20", urgent: true },
                    { task: "Internship Application", due: "Jan 25", urgent: false },
                    { task: "NAAC Documentation", due: "Feb 01", urgent: false }
                  ].map((deadline) => (
                    <div key={deadline.task} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div>
                        <div className="font-medium text-sm">{deadline.task}</div>
                        <div className="text-xs text-muted-foreground">{deadline.due}</div>
                      </div>
                      {deadline.urgent && (
                        <Badge variant="destructive" className="text-xs">
                          Urgent
                        </Badge>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;