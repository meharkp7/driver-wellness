import { Smile, Frown, Meh, HeartPulse } from "lucide-react";
import MetricExplanation from "./MetricExplanation";

const StressEmotion = () => {
  const emotions = [
    { icon: Smile, label: "Happy", value: 15, color: "hsl(158 90% 55%)" },
    { icon: Meh, label: "Neutral", value: 45, color: "hsl(45 100% 55%)" },
    { icon: Frown, label: "Stressed", value: 40, color: "hsl(348 90% 60%)" },
  ];

  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-lg card-hover">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Stress & Emotion</h3>
        <div className="flex items-center gap-2 text-muted-foreground">
          <HeartPulse className="w-4 h-4" />
          <span className="text-sm font-mono">72 BPM</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {emotions.map((emotion) => {
          const Icon = emotion.icon;
          return (
            <div
              key={emotion.label}
              className="flex flex-col items-center gap-2 p-4 bg-secondary/50 rounded-xl border border-border/50"
            >
              <Icon className="w-8 h-8" style={{ color: emotion.color }} />
              <span className="text-xs font-medium">{emotion.label}</span>
              <span className="text-2xl font-bold font-mono" style={{ color: emotion.color }}>
                {emotion.value}%
              </span>
            </div>
          );
        })}
      </div>

      {/* Stress Level Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Overall Stress Level</span>
          <div className="flex items-center gap-2">
            <span className="font-mono font-semibold text-warning">Moderate</span>
            <MetricExplanation 
              metric="Stress Level" 
              value="Moderate"
              context={{
                happy: "15%",
                neutral: "45%",
                stressed: "40%",
                heartRate: "72 BPM"
              }}
            />
          </div>
        </div>
        <div className="h-3 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-success via-warning to-destructive rounded-full transition-all duration-1000"
            style={{ width: "60%" }}
          />
        </div>
      </div>

      {/* Heart Rate Variability */}
      <div className="mt-4 p-3 bg-secondary/30 rounded-lg border border-border/50">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Heart Rate Variability</span>
          <span className="text-sm font-mono font-semibold text-success">Normal</span>
        </div>
        <div className="mt-2 h-8 flex items-end gap-1">
          {[40, 65, 45, 70, 55, 75, 60, 50, 68, 58, 72, 62].map((height, i) => (
            <div
              key={i}
              className="flex-1 bg-primary/30 rounded-t transition-all duration-300"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StressEmotion;
