import { Button } from "@/components/ui/button";
import { GraduationCap, Menu } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <GraduationCap className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Smart Student Hub
          </span>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-primary transition-smooth">
            Features
          </a>
          <a href="#dashboard" className="text-sm font-medium text-muted-foreground hover:text-primary transition-smooth">
            Dashboard
          </a>
          <a href="#portfolio" className="text-sm font-medium text-muted-foreground hover:text-primary transition-smooth">
            Portfolio
          </a>
          <a href="/student-info" className="text-sm font-medium text-muted-foreground hover:text-primary transition-smooth">
            Student Info
          </a>
        </nav>

        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" className="hidden md:flex">
            Login
          </Button>
          <Button size="sm" className="gradient-primary text-white">
            Get Started
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;