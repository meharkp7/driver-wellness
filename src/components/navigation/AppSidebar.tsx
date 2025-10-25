import { Activity, FileText, User, Settings as SettingsIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type TabType = "dashboard" | "reports" | "profile" | "settings";

interface AppSidebarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const AppSidebar = ({ activeTab, onTabChange }: AppSidebarProps) => {
  const tabs = [
    { id: "dashboard" as TabType, label: "Dashboard", icon: Activity },
    { id: "reports" as TabType, label: "Reports", icon: FileText },
    { id: "profile" as TabType, label: "Profile", icon: User },
    { id: "settings" as TabType, label: "Settings", icon: SettingsIcon },
  ];

  return (
    <TooltipProvider>
      <aside className="fixed left-0 top-0 h-screen w-20 bg-card/95 backdrop-blur-lg border-r border-border z-50 flex flex-col items-center py-6 gap-2">
        {/* Logo */}
        <div className="mb-8 w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center animate-glow-pulse">
          <Activity className="w-7 h-7 text-primary-foreground" />
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 flex flex-col gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <Tooltip key={tab.id}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => onTabChange(tab.id)}
                    className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 relative group ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-glow-primary"
                        : "bg-secondary/30 text-muted-foreground hover:bg-secondary hover:text-foreground hover:scale-110"
                    }`}
                  >
                    <Icon className={`w-6 h-6 transition-transform ${isActive ? "scale-110" : "group-hover:scale-110"}`} />
                    {isActive && (
                      <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full animate-fade-in" />
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right" className="ml-2">
                  <p className="font-medium">{tab.label}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </nav>

        {/* Bottom Indicator */}
        <div className="w-10 h-1 rounded-full bg-gradient-primary animate-pulse" />
      </aside>
    </TooltipProvider>
  );
};

export default AppSidebar;
