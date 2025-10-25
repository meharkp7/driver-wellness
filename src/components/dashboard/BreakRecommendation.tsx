import { Coffee, Navigation, Clock } from "lucide-react";

interface BreakRecommendationProps {
  fatigueScore: number;
}

const BreakRecommendation = ({ fatigueScore }: BreakRecommendationProps) => {
  const getRecommendation = () => {
    if (fatigueScore < 40) {
      return {
        urgency: "Immediate",
        color: "destructive",
        message: "Pull over at the next safe location",
        distance: "0.5 km",
        location: "Rest Area - Exit 12"
      };
    } else if (fatigueScore < 60) {
      return {
        urgency: "Soon",
        color: "warning",
        message: "Break recommended within 15 minutes",
        distance: "8.2 km",
        location: "Service Station - Exit 15"
      };
    }
    return {
      urgency: "Optimal",
      color: "success",
      message: "Continue monitoring, break in 45 min",
      distance: "35 km",
      location: "Highway Rest Stop"
    };
  };

  const rec = getRecommendation();

  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-lg card-hover">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Break Recommendation</h3>
        <Coffee className="w-5 h-5 text-primary" />
      </div>

      <div className={`p-4 rounded-xl border-2 mb-4 ${
        rec.color === "destructive" 
          ? "bg-destructive/10 border-destructive"
          : rec.color === "warning"
          ? "bg-warning/10 border-warning"
          : "bg-success/10 border-success"
      }`}>
        <div className="flex items-center justify-between mb-2">
          <span className={`text-sm font-semibold ${
            rec.color === "destructive" ? "text-destructive" :
            rec.color === "warning" ? "text-warning" : "text-success"
          }`}>
            {rec.urgency}
          </span>
          <div className={`px-2 py-1 rounded-full text-xs font-mono ${
            rec.color === "destructive" ? "bg-destructive/20 text-destructive" :
            rec.color === "warning" ? "bg-warning/20 text-warning" : "bg-success/20 text-success"
          }`}>
            {rec.distance}
          </div>
        </div>
        <p className="text-sm font-medium mb-1">{rec.message}</p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Navigation className="w-3 h-3" />
          <span>{rec.location}</span>
        </div>
      </div>

      {/* Trip Duration */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 bg-secondary/50 rounded-lg border border-border/50">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Driving Time</span>
          </div>
          <span className="text-xl font-bold font-mono">2h 34m</span>
        </div>
        
        <div className="p-3 bg-secondary/50 rounded-lg border border-border/50">
          <div className="flex items-center gap-2 mb-1">
            <Coffee className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Last Break</span>
          </div>
          <span className="text-xl font-bold font-mono">58m ago</span>
        </div>
      </div>

      <button className="w-full mt-4 p-3 bg-primary/20 hover:bg-primary/30 border border-primary/50 rounded-lg transition-all duration-300 text-sm font-medium text-primary">
        Navigate to Rest Area
      </button>
    </div>
  );
};

export default BreakRecommendation;
