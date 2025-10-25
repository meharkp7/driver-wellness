import { User } from "lucide-react";
import { useEffect, useState } from "react";

interface DigitalTwinProps {
  fatigueLevel: number;
}

const DigitalTwin = ({ fatigueLevel }: DigitalTwinProps) => {
  const [tilt, setTilt] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTilt(Math.sin(Date.now() / 1000) * 5);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const getExpression = () => {
    if (fatigueLevel >= 70) return { color: "success", status: "Alert" };
    if (fatigueLevel >= 40) return { color: "warning", status: "Tired" };
    return { color: "destructive", status: "Drowsy" };
  };

  const expression = getExpression();

  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Digital Twin</h3>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          expression.color === "success" ? "bg-success/20 text-success" :
          expression.color === "warning" ? "bg-warning/20 text-warning" :
          "bg-destructive/20 text-destructive"
        }`}>
          {expression.status}
        </span>
      </div>

      {/* 3D Avatar Container */}
      <div className="relative h-64 bg-gradient-to-b from-muted/30 to-muted/50 rounded-xl overflow-hidden border border-border/50 mb-4">
        <div className="absolute inset-0 flex items-center justify-center" style={{
          transform: `rotateY(${tilt}deg)`,
          transition: "transform 0.1s ease-out"
        }}>
          {/* Simplified 3D head representation */}
          <div className="relative">
            {/* Head */}
            <div className={`w-32 h-40 rounded-[40%_40%_45%_45%] border-4 flex items-center justify-center transition-colors duration-500 ${
              expression.color === "success" ? "bg-success/20 border-success/50" :
              expression.color === "warning" ? "bg-warning/20 border-warning/50" :
              "bg-destructive/20 border-destructive/50"
            }`}>
              <User className="w-16 h-16 text-foreground/50" />
            </div>
            
            {/* Eyes */}
            <div className="absolute top-12 left-8 w-4 h-4 bg-foreground rounded-full animate-pulse" />
            <div className="absolute top-12 right-8 w-4 h-4 bg-foreground rounded-full animate-pulse" />
            
            {/* Expression indicator */}
            <div className={`absolute bottom-12 left-1/2 transform -translate-x-1/2 w-12 h-1 rounded-full transition-colors ${
              expression.color === "success" ? "bg-success" :
              expression.color === "warning" ? "bg-warning" :
              "bg-destructive"
            }`} style={{
              transform: `translateX(-50%) ${fatigueLevel < 40 ? 'scaleY(-1)' : ''}`
            }} />
          </div>
        </div>

        {/* Grid background */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-6 grid-rows-6 h-full">
            {[...Array(36)].map((_, i) => (
              <div key={i} className="border border-primary/20" />
            ))}
          </div>
        </div>
      </div>

      {/* Status Indicators */}
      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between p-2 bg-secondary/30 rounded-lg">
          <span className="text-muted-foreground">Head Pose</span>
          <span className="font-mono text-primary">Tracking</span>
        </div>
        <div className="flex items-center justify-between p-2 bg-secondary/30 rounded-lg">
          <span className="text-muted-foreground">Eye Movement</span>
          <span className="font-mono text-primary">Active</span>
        </div>
        <div className="flex items-center justify-between p-2 bg-secondary/30 rounded-lg">
          <span className="text-muted-foreground">Posture</span>
          <span className={`font-mono ${
            fatigueLevel >= 70 ? "text-success" :
            fatigueLevel >= 40 ? "text-warning" : "text-destructive"
          }`}>
            {fatigueLevel >= 70 ? "Upright" : fatigueLevel >= 40 ? "Slouching" : "Slumped"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DigitalTwin;
