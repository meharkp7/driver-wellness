import { Activity, FileText, User, Settings as SettingsIcon, Gauge } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type TabType = "dashboard" | "reports" | "profile" | "settings";

interface AppSidebarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const AppSidebar = ({ activeTab, onTabChange }: AppSidebarProps) => {
  const tabs = [
    { id: "dashboard" as TabType, label: "Dashboard", icon: Gauge },
    { id: "reports" as TabType, label: "Reports", icon: FileText },
    { id: "profile" as TabType, label: "Profile", icon: User },
    { id: "settings" as TabType, label: "Settings", icon: SettingsIcon },
  ];

  return (
    <TooltipProvider>
      <aside className="fixed left-0 top-0 h-screen w-20 bg-card/98 backdrop-blur-xl border-r border-border/50 z-50 flex flex-col items-center py-8 shadow-2xl">
        {/* Logo/Brand */}
        <div className="mb-12 relative group">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-glow-primary animate-glow-pulse">
            <Activity className="w-8 h-8 text-primary-foreground" />
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 flex flex-col gap-3 w-full px-3">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <Tooltip key={tab.id}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => onTabChange(tab.id)}
                    className={`relative w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group ${
                      isActive
                        ? "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-glow-primary scale-105"
                        : "bg-secondary/40 text-muted-foreground hover:bg-secondary hover:text-foreground hover:scale-105 hover:shadow-lg"
                    }`}
                  >
                    {/* Active indicator */}
                    {isActive && (
                      <>
                        <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-primary rounded-r-full animate-fade-in" />
                        <div className="absolute inset-0 rounded-2xl bg-primary/20 animate-pulse" />
                      </>
                    )}
                    
                    {/* Icon */}
                    <Icon className={`relative z-10 w-6 h-6 transition-all duration-300 ${
                      isActive ? "scale-110" : "group-hover:scale-110"
                    }`} />
                    
                    {/* Hover glow effect */}
                    {!isActive && (
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/10 group-hover:to-primary/5 transition-all duration-300" />
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent 
                  side="right" 
                  className="ml-3 bg-card/95 backdrop-blur-xl border-primary/20 shadow-xl"
                >
                  <p className="font-semibold text-sm">{tab.label}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </nav>

        {/* Bottom Status Indicator */}
        <div className="flex flex-col items-center gap-2 mt-4">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse shadow-lg shadow-success/50" />
          <div className="w-10 h-1 rounded-full bg-gradient-to-r from-primary/50 via-primary to-primary/50" />
        </div>
      </aside>
    </TooltipProvider>
  );
};

export default AppSidebar;
