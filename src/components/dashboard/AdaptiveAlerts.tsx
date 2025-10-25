import { AlertTriangle, Volume2, Vibrate, Eye } from "lucide-react";
import { useState, useEffect } from "react";

interface AdaptiveAlertsProps {
  onEmergencyTrigger: () => void;
  fatigueScore: number;
}

const AdaptiveAlerts = ({ onEmergencyTrigger, fatigueScore }: AdaptiveAlertsProps) => {
  const [alerts, setAlerts] = useState<Array<{ id: string; message: string; level: "info" | "warning" | "critical" }>>([]);

  useEffect(() => {
    const newAlerts = [];
    
    if (fatigueScore < 40) {
      newAlerts.push({
        id: "fatigue-critical",
        message: "Critical fatigue detected",
        level: "critical" as const
      });
    } else if (fatigueScore < 60) {
      newAlerts.push({
        id: "fatigue-warning",
        message: "Fatigue levels increasing",
        level: "warning" as const
      });
    }

    setAlerts(newAlerts);
  }, [fatigueScore]);

  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-lg card-hover">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Adaptive Alerts</h3>
        <AlertTriangle className="w-5 h-5 text-warning" />
      </div>

      {/* Alert Modes */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg border border-border/50">
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-primary" />
            <span className="text-sm">Audio Alert</span>
          </div>
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
        </div>

        <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg border border-border/50">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-primary" />
            <span className="text-sm">Visual Alert</span>
          </div>
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
        </div>

        <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg border border-border/50">
          <div className="flex items-center gap-2">
            <Vibrate className="w-4 h-4 text-primary" />
            <span className="text-sm">Haptic Alert</span>
          </div>
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
        </div>
      </div>

      {/* Active Alerts */}
      <div className="space-y-2">
        {alerts.length === 0 ? (
          <div className="p-4 bg-success/10 border border-success/30 rounded-lg text-center">
            <span className="text-sm text-success">No active alerts</span>
          </div>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-3 rounded-lg border animate-fade-in ${
                alert.level === "critical"
                  ? "bg-destructive/10 border-destructive/30"
                  : alert.level === "warning"
                  ? "bg-warning/10 border-warning/30"
                  : "bg-primary/10 border-primary/30"
              }`}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full animate-pulse ${
                    alert.level === "critical"
                      ? "bg-destructive"
                      : alert.level === "warning"
                      ? "bg-warning"
                      : "bg-primary"
                  }`}
                />
                <span className="text-sm font-medium">{alert.message}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Emergency Button */}
      <button
        onClick={onEmergencyTrigger}
        className="w-full mt-4 p-3 bg-destructive/20 hover:bg-destructive/30 border border-destructive/50 rounded-lg transition-all duration-300 text-sm font-medium text-destructive"
      >
        Simulate Emergency Mode
      </button>
    </div>
  );
};

export default AdaptiveAlerts;
