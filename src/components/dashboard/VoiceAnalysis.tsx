import { Mic, TrendingUp } from "lucide-react";
import MetricExplanation from "./MetricExplanation";

const VoiceAnalysis = () => {
  const voiceMetrics = [
    { label: "Pitch Variation", value: 68, status: "Normal" },
    { label: "Speech Rate", value: 45, status: "Slow" },
    { label: "Stress Markers", value: 72, status: "Elevated" },
  ];

  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-lg card-hover">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Voice & Tone Analysis</h3>
        <div className="flex items-center gap-2">
          <Mic className="w-5 h-5 text-primary animate-pulse" />
          <span className="text-xs text-muted-foreground font-mono">LISTENING</span>
        </div>
      </div>

      {/* Waveform Visualization */}
      <div className="h-20 bg-muted/30 rounded-xl border border-border/50 p-4 mb-4 flex items-center justify-center gap-1">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="w-1 bg-primary/60 rounded-full transition-all duration-300"
            style={{
              height: `${20 + Math.sin(i * 0.5 + Date.now() / 200) * 30}px`,
              animation: "pulse 1s ease-in-out infinite",
              animationDelay: `${i * 20}ms`
            }}
          />
        ))}
      </div>

      {/* Voice Metrics */}
      <div className="space-y-3">
        {voiceMetrics.map((metric) => (
          <div key={metric.label} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{metric.label}</span>
              <span className={`font-mono font-medium ${
                metric.status === "Normal" ? "text-success" :
                metric.status === "Slow" ? "text-warning" : "text-destructive"
              }`}>
                {metric.status}
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-1000 ${
                  metric.status === "Normal" ? "bg-success" :
                  metric.status === "Slow" ? "bg-warning" : "bg-destructive"
                }`}
                style={{ width: `${metric.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Overall Stress from Voice */}
      <div className="mt-4 p-3 bg-warning/10 border border-warning/30 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-warning" />
            <span className="text-sm font-medium">Stress Detected in Voice</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold font-mono text-warning">Moderate</span>
            <MetricExplanation 
              metric="Voice Analysis" 
              value="Moderate"
              context={{
                pitchVariation: "68% - Normal",
                speechRate: "45% - Slow",
                stressMarkers: "72% - Elevated"
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceAnalysis;
