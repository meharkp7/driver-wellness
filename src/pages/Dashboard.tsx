import { useState } from "react";
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
import AppSidebar from "@/components/navigation/AppSidebar";

type TabType = "dashboard" | "reports" | "profile" | "settings";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [fatigueScore, setFatigueScore] = useState(72);
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);

  return (
    <PageTransition>
      <div className="min-h-screen bg-background text-foreground font-sans relative overflow-hidden">
        {/* Page-specific animated background */}
        {activeTab === "dashboard" && <WaveBackground />}
        
        {/* Emergency Overlay */}
        {isEmergencyMode && <EmergencyOverlay />}

        {/* Floating Digital Twin */}
        <DigitalTwin fatigueLevel={fatigueScore} />

        {/* Sidebar Navigation */}
        <AppSidebar activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Main Content with left padding for sidebar */}
        <main className="relative z-10 ml-20 px-6 py-6 min-h-screen">
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
  </PageTransition>
  );
};

export default Dashboard;
