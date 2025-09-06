import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Dashboard from "@/components/Dashboard";
import Portfolio from "@/components/Portfolio";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Features />
        <Dashboard />
        <Portfolio />
      </main>
      <footer className="py-12 border-t bg-muted/30">
        <div className="container text-center space-y-4">
          <div className="text-sm text-muted-foreground">
            © 2024 Smart Student Hub. Transforming Higher Education through Technology.
          </div>
          <div className="flex justify-center space-x-6 text-sm">
            <a href="#" className="text-muted-foreground hover:text-primary transition-smooth">Privacy Policy</a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-smooth">Terms of Service</a>
            <a href="#contact" className="text-muted-foreground hover:text-primary transition-smooth">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
