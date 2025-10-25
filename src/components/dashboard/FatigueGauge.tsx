import { useEffect, useState } from "react";
import { Battery } from "lucide-react";
import MetricExplanation from "./MetricExplanation";

interface FatigueGaugeProps {
  score: number;
}

const FatigueGauge = ({ score }: FatigueGaugeProps) => {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setDisplayScore(score), 100);
    return () => clearTimeout(timer);
  }, [score]);

  const getBatteryColor = (value: number) => {
    if (value >= 70) return { icon: "text-success", bg: "bg-success", label: "Alert" };
    if (value >= 40) return { icon: "text-warning", bg: "bg-warning", label: "Mild Fatigue" };
    return { icon: "text-destructive", bg: "bg-destructive", label: "Drowsy" };
  };

  const batteryColor = getBatteryColor(score);
  const circumference = 2 * Math.PI * 70;
  const strokeDashoffset = circumference - (displayScore / 100) * circumference;

  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-lg card-hover">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Battery className={`w-5 h-5 ${batteryColor.icon}`} />
          <h3 className="text-lg font-semibold">Fatigue Level</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${batteryColor.bg}/20 ${batteryColor.icon}`}>
            {batteryColor.label}
          </span>
          <MetricExplanation 
            metric="Fatigue Level" 
            value={score}
            context={{ status: batteryColor.label }}
          />
        </div>
      </div>

      <div className="flex items-center justify-center py-4">
        <div className="relative w-48 h-48">
          <svg className="transform -rotate-90 w-48 h-48">
            {/* Background circle */}
            <circle
              cx="96"
              cy="96"
              r="70"
              stroke="hsl(var(--border))"
              strokeWidth="12"
              fill="none"
            />
            {/* Progress circle */}
            <circle
              cx="96"
              cy="96"
              r="70"
              stroke={`hsl(var(--${displayScore >= 70 ? 'success' : displayScore >= 40 ? 'warning' : 'destructive'}))`}
              strokeWidth="12"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
              style={{
                filter: displayScore >= 70 ? 'drop-shadow(0 0 8px hsl(var(--success) / 0.6))' :
                        displayScore >= 40 ? 'drop-shadow(0 0 8px hsl(var(--warning) / 0.6))' :
                        'drop-shadow(0 0 8px hsl(var(--destructive) / 0.6))'
              }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-5xl font-bold font-mono ${
              displayScore >= 70 ? 'text-success' : displayScore >= 40 ? 'text-warning' : 'text-destructive'
            }`}>
              {displayScore}
            </span>
            <span className="text-sm text-muted-foreground font-mono">/ 100</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-border">
        <div className="text-center">
          <div className="w-3 h-3 rounded-full bg-success mx-auto mb-1" />
          <span className="text-xs text-muted-foreground">70-100</span>
        </div>
        <div className="text-center">
          <div className="w-3 h-3 rounded-full bg-warning mx-auto mb-1" />
          <span className="text-xs text-muted-foreground">40-69</span>
        </div>
        <div className="text-center">
          <div className="w-3 h-3 rounded-full bg-destructive mx-auto mb-1" />
          <span className="text-xs text-muted-foreground">0-39</span>
        </div>
      </div>
    </div>
  );
};

export default FatigueGauge;
