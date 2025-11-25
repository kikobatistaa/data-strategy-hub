import { Briefcase, Globe, X, Send, Mail } from "lucide-react";
import { useState, useEffect } from "react"; // <-- NEW: Import useState and useEffect
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  // Removed: DrawerTrigger is no longer needed
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/locales/translations";

const JobOpportunityDrawer = () => {
  // 1. Initialize state to false
  const [isOpen, setIsOpen] = useState(false); 
  
  // 2. Set state to true on mount to make it appear on load
  useEffect(() => {
    setIsOpen(true);
  }, []); 

  const { language } = useLanguage();
  const t = translations[language].drawer;

  return (
    // 3. Control the drawer's visibility using the state
    <Drawer 
      open={isOpen} // Use state to open/close
      onOpenChange={setIsOpen} // Allows swipe-down/DrawerClose to set isOpen(false)
      modal={false} // Keep it non-intrusive
    > 
      {/* Removed the unnecessary DrawerTrigger hack */}

      <DrawerContent 
        className="max-h-[80vh] h-auto w-full md:max-w-md mx-auto rounded-t-lg shadow-2xl border-t-4 border-accent bg-card/80 backdrop-blur-lg"
      >
        
        {/* Close button positioned top-right. */}
        <div className="absolute top-4 right-4 z-10">
          {/* DrawerClose will now correctly trigger onOpenChange(false) */}
          <DrawerClose asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </Button>
          </DrawerClose>
        </div>
        
        <DrawerHeader className="text-left">
          <DrawerTitle className="flex items-center gap-2 text-foreground">
            <Briefcase className="h-5 w-5 text-accent" />
            {t.title}
          </DrawerTitle>
          <DrawerDescription className="text-base text-muted-foreground mt-2">
            {t.description}
          </DrawerDescription>
        </DrawerHeader>
        
        <div className="p-4 flex-1 space-y-4">
          <div className="flex items-start gap-3 p-3 bg-secondary/50 rounded-lg border border-border/30">
            <Globe className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
            <p className="text-sm text-foreground/80">
              {t.region_open}
            </p>
          </div>
          <div className="flex items-start gap-3 p-3 bg-secondary/50 rounded-lg border border-border/30">
            <Send className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
            <p className="text-sm text-foreground/80">
              {t.region_focus}
            </p>
          </div>
        </div>
        
        <DrawerFooter className="pt-0">
          <Button asChild size="lg" className="shadow-lg">
             <a href="mailto:kiko.2205@hotmail.com">
               <Mail className="mr-2 h-5 w-5" />
               {t.contact}
             </a>
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default JobOpportunityDrawer;