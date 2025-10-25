import { TrendingUp } from "lucide-react";
import MetricExplanation from "./MetricExplanation";

const SteeringStability = () => {
  const dataPoints = [
    0, 2, -1, 3, 1, -2, 4, 2, -1, 3, 0, 2, -3, 1, 2, -1, 0, 3, -2, 1,
    -1, 2, 0, -2, 1, 3, -1, 2, 0, -1, 2, 1, -2, 0, 3, -1, 2, 1, -1, 0
  ];

  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-lg card-hover">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Steering Stability</h3>
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-success" />
          <span className="text-sm font-mono text-success">Stable</span>
          <MetricExplanation 
            metric="Steering Stability" 
            value="Stable"
            context={{ laneDeviation: "±0.15m", centerOffset: "0.0m" }}
          />
        </div>
      </div>

      {/* Steering Graph */}
      <div className="relative h-32 bg-muted/30 rounded-xl p-4 border border-border/50 overflow-hidden">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full h-px bg-border" />
        </div>
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 100">
          <polyline
            points={dataPoints.map((y, x) => `${x * 10},${50 - y * 5}`).join(" ")}
            fill="none"
            stroke="hsl(190 100% 50%)"
            strokeWidth="2"
            className="drop-shadow-[0_0_8px_rgba(0,212,255,0.5)]"
          />
        </svg>
      </div>

      {/* Lane Deviation Visual */}
      <div className="mt-4 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Lane Deviation</span>
          <span className="font-mono text-primary">±0.15m</span>
        </div>
        
        <div className="relative h-16 bg-muted/30 rounded-xl overflow-hidden border border-border/50">
          {/* Road lanes */}
          <div className="absolute inset-0 flex items-center justify-center gap-8">
            <div className="w-1 h-full bg-border/50" />
            <div className="w-1 h-full bg-border" />
            <div className="w-1 h-full bg-border/50" />
          </div>
          
          {/* Car position */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="w-8 h-14 bg-primary/80 rounded-lg border-2 border-primary shadow-glow-primary animate-pulse-glow" />
              <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-1 h-3 bg-primary-foreground rounded" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 text-xs text-center">
          <div>
            <div className="text-muted-foreground">Left</div>
            <div className="font-mono text-foreground">-0.1m</div>
          </div>
          <div>
            <div className="text-muted-foreground">Center</div>
            <div className="font-mono text-success">0.0m</div>
          </div>
          <div>
            <div className="text-muted-foreground">Right</div>
            <div className="font-mono text-foreground">+0.1m</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SteeringStability;
