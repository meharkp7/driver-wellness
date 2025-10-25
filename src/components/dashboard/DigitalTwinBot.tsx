import { useState } from "react";
import { Brain, X, Sparkles, Info } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface DigitalTwinBotProps {
  fatigueLevel: number;
}

const DigitalTwinBot = ({ fatigueLevel }: DigitalTwinBotProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [explanation, setExplanation] = useState("");
  const { toast } = useToast();

  const getStatus = () => {
    if (fatigueLevel >= 70) return { 
      text: "Alert & Focused",
      color: "success",
      emoji: "😊"
    };
    if (fatigueLevel >= 40) return { 
      text: "Mild Fatigue",
      color: "warning",
      emoji: "😐"
    };
    return { 
      text: "High Fatigue",
      color: "destructive",
      emoji: "😴"
    };
  };

  const fetchExplanation = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("explain-metric", {
        body: {
          metric: "Fatigue Score",
          value: `${fatigueLevel}/100`,
          context: {
            fatigueLevel,
            eyeTracking: "Active",
            headPose: "Monitoring",
            heartRate: "72 BPM",
            stressLevel: "Moderate",
            voiceAnalysis: "Elevated stress markers detected",
            drivingTime: "2h 34m",
            lastBreak: "58m ago"
          }
        }
      });

      if (error) throw error;
      
      setExplanation(data.explanation);
    } catch (error: any) {
      console.error("Error fetching explanation:", error);
      toast({
        title: "Unable to get explanation",
        description: error.message || "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleExpand = () => {
    if (!isExpanded) {
      fetchExplanation();
    }
    setIsExpanded(!isExpanded);
  };

  const status = getStatus();

  return (
    <>
      {/* Circular Bot Button */}
      <div className="fixed bottom-8 right-8 z-40">
        <button
          onClick={handleExpand}
          className={`relative group transition-all duration-500 ${
            isExpanded ? "scale-0 opacity-0" : "scale-100 opacity-100"
          }`}
          aria-label="Open Digital Twin Assistant"
        >
          {/* Pulsing glow effect */}
          <div className={`absolute inset-0 rounded-full animate-ping opacity-75 bg-${status.color}`} />
          <div className={`absolute inset-0 rounded-full bg-gradient-to-br from-${status.color} to-primary blur-xl opacity-60 group-hover:opacity-100 transition-opacity`} />
          
          {/* Main bot circle */}
          <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-card to-card/80 border-4 border-primary shadow-2xl flex items-center justify-center animate-float">
            <Avatar className="w-16 h-16">
              <AvatarImage src="https://api.dicebear.com/7.x/bottts-neutral/svg?seed=calmdrive&backgroundColor=1e40af" />
              <AvatarFallback className="bg-primary/20">
                <Brain className="w-8 h-8 text-primary" />
              </AvatarFallback>
            </Avatar>
            
            {/* Status indicator */}
            <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full bg-${status.color} border-2 border-background flex items-center justify-center animate-pulse`}>
              <span className="text-xs">{status.emoji}</span>
            </div>
          </div>

          {/* Hint tooltip */}
          <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <div className="bg-card border border-border rounded-lg px-3 py-2 text-sm whitespace-nowrap shadow-lg">
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                Ask me about your wellness
              </span>
            </div>
          </div>
        </button>
      </div>

      {/* Expanded Panel */}
      <div
        className={`fixed bottom-8 right-8 z-50 transition-all duration-500 transform ${
          isExpanded ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
        style={{ transformOrigin: "bottom right" }}
      >
        <div className="w-96 bg-gradient-to-br from-card via-card to-card/90 backdrop-blur-xl border-2 border-primary/50 rounded-3xl shadow-2xl overflow-hidden animate-scale-in">
          {/* Header */}
          <div className="relative bg-gradient-primary p-6 pb-16">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12 border-2 border-white/50">
                  <AvatarImage src="https://api.dicebear.com/7.x/bottts-neutral/svg?seed=calmdrive&backgroundColor=1e40af" />
                  <AvatarFallback>
                    <Brain className="w-6 h-6" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-bold text-white">CalmBot</h3>
                  <p className="text-xs text-white/80">Your Wellness Assistant</p>
                </div>
              </div>
              
              <button
                onClick={() => setIsExpanded(false)}
                className="p-2 rounded-full hover:bg-white/20 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Status badge */}
            <div className="absolute bottom-4 left-6 right-6">
              <div className={`p-3 rounded-xl bg-${status.color}/20 backdrop-blur-sm border border-${status.color}/30`}>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white">Current Status</span>
                  <span className={`text-lg font-bold text-${status.color}`}>{status.text}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {/* AI Explanation */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Info className="w-4 h-4" />
                <span className="text-sm font-medium">AI Analysis</span>
              </div>
              
              {isLoading ? (
                <div className="p-4 bg-secondary/30 rounded-xl border border-border/50">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
                    <span className="text-sm text-muted-foreground">Analyzing your wellness data...</span>
                  </div>
                </div>
              ) : explanation ? (
                <div className="p-4 bg-secondary/30 rounded-xl border border-border/50 space-y-2">
                  <p className="text-sm leading-relaxed">{explanation}</p>
                  <button
                    onClick={fetchExplanation}
                    className="text-xs text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3" />
                    Refresh analysis
                  </button>
                </div>
              ) : (
                <div className="p-4 bg-secondary/30 rounded-xl border border-border/50">
                  <p className="text-sm text-muted-foreground">Click refresh to get a detailed analysis</p>
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="space-y-2">
              <span className="text-sm font-medium text-muted-foreground">Quick Stats</span>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 bg-secondary/30 rounded-lg border border-border/50">
                  <div className="text-xs text-muted-foreground">Fatigue</div>
                  <div className="text-xl font-bold font-mono">{fatigueLevel}%</div>
                </div>
                <div className="p-3 bg-secondary/30 rounded-lg border border-border/50">
                  <div className="text-xs text-muted-foreground">Drive Time</div>
                  <div className="text-xl font-bold font-mono">2h 34m</div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={fetchExplanation}
              disabled={isLoading}
              className="w-full py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-medium transition-all duration-300 hover:shadow-glow-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Get Detailed Insights
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DigitalTwinBot;
