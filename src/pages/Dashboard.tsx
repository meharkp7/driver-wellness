import { useState } from "react";
import { Activity, Settings as SettingsIcon, User, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PageTransition } from "@/components/ui/page-transition";
import { WaveBackground } from "@/components/ui/wave-background";
import FatigueGauge from "@/components/dashboard/FatigueGauge";
import CameraFeed from "@/components/dashboard/CameraFeed";
import StressEmotion from "@/components/dashboard/StressEmotion";
import SteeringStability from "@/components/dashboard/SteeringStability";
import AdaptiveAlerts from "@/components/dashboard/AdaptiveAlerts";
import BreakRecommendation from "@/components/dashboard/BreakRecommendation";
import DigitalTwin from "@/components/dashboard/DigitalTwin";
import EnvironmentalContext from "@/components/dashboard/EnvironmentalContext";
import PrivacyConsent from "@/components/dashboard/PrivacyConsent";
import EmergencyOverlay from "@/components/dashboard/EmergencyOverlay";
import VoiceAnalysis from "@/components/dashboard/VoiceAnalysis";
import Reports from "./Reports";
import Profile from "./Profile";
import Settings from "./Settings";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type TabType = "dashboard" | "reports" | "profile" | "settings";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [fatigueScore, setFatigueScore] = useState(72);
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);

  const tabs = [
    { id: "dashboard" as TabType, label: "Dashboard", icon: Activity },
    { id: "reports" as TabType, label: "Reports", icon: FileText },
    { id: "profile" as TabType, label: "Profile", icon: User },
    { id: "settings" as TabType, label: "Settings", icon: SettingsIcon },
  ];

  return (
    <PageTransition>
      <TooltipProvider>
        <div className="min-h-screen bg-background text-foreground font-sans relative overflow-hidden">
        {/* Page-specific animated background */}
        {activeTab === "dashboard" && <WaveBackground />}
        
        {/* Emergency Overlay */}
        {isEmergencyMode && <EmergencyOverlay />}

        {/* Floating Digital Twin */}
        <DigitalTwin fatigueLevel={fatigueScore} />

        {/* Header */}
        <header className="relative z-10 border-b border-border bg-card/80 backdrop-blur-lg">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center animate-glow-pulse">
                  <Activity className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold tracking-tight">CalmDrive</h1>
                  <Tooltip>
                    <TooltipTrigger>
                      <p className="text-xs text-muted-foreground font-mono cursor-help">Wellness Monitoring v2.5</p>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Advanced driver monitoring system with AI-powered fatigue detection and real-time safety alerts</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
              
              {/* Tab Navigation */}
              <nav className="flex gap-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <Tooltip key={tab.id}>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => setActiveTab(tab.id)}
                          className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 ${
                            activeTab === tab.id
                              ? "bg-primary text-primary-foreground shadow-glow-primary"
                              : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span className="font-medium">{tab.label}</span>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Navigate to {tab.label}</p>
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
              </nav>
            </div>
          </div>
        </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-6 py-6">
        {activeTab === "dashboard" && (
          <div className="grid grid-cols-12 gap-6 animate-fade-in">
            {/* Left Column */}
            <div className="col-span-12 lg:col-span-8 space-y-6">
              {/* Top Row - Camera and Fatigue */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CameraFeed />
                <FatigueGauge score={fatigueScore} />
              </div>

              {/* Stress & Emotion */}
              <StressEmotion />

              {/* Steering Stability */}
              <SteeringStability />

              {/* Voice Analysis */}
              <VoiceAnalysis />
            </div>

            {/* Right Column */}
            <div className="col-span-12 lg:col-span-4 space-y-6">
              {/* Adaptive Alerts */}
              <AdaptiveAlerts 
                onEmergencyTrigger={() => setIsEmergencyMode(true)} 
                fatigueScore={fatigueScore}
              />

              {/* Break Recommendation */}
              <BreakRecommendation fatigueScore={fatigueScore} />

              {/* Environmental Context */}
              <EnvironmentalContext />

              {/* Privacy & Consent */}
              <PrivacyConsent />
            </div>
          </div>
        )}

          {activeTab === "reports" && <Reports />}
          {activeTab === "profile" && <Profile />}
          {activeTab === "settings" && <Settings />}
        </main>
      </div>
    </TooltipProvider>
  </PageTransition>
  );
};

export default Dashboard;
