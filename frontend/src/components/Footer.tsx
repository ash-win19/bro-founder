import { Rocket } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Rocket className="w-5 h-5 text-primary" />
            <span className="font-bold text-lg">Bro Founder</span>
          </div>
          
          <p className="text-sm text-muted-foreground font-mono">
            Think smarter. Build better. Ship faster.
          </p>

          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Bro Founder. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
