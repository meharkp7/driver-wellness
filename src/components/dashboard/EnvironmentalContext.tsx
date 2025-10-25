import { Thermometer, Sun, Volume2 } from "lucide-react";

const EnvironmentalContext = () => {
  const metrics = [
    {
      icon: Thermometer,
      label: "Cabin Temp",
      value: "22°C",
      status: "Optimal",
      color: "success"
    },
    {
      icon: Sun,
      label: "Road Lighting",
      value: "Low",
      status: "Night Mode",
      color: "warning"
    },
    {
      icon: Volume2,
      label: "Noise Level",
      value: "45 dB",
      status: "Quiet",
      color: "success"
    }
  ];

  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-lg card-hover">
      <h3 className="text-lg font-semibold mb-4">Environmental Context</h3>

      <div className="space-y-3">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.label}
              className="p-3 bg-secondary/30 rounded-lg border border-border/50"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">{metric.label}</span>
                </div>
                <span className={`text-xs font-medium ${
                  metric.color === "success" ? "text-success" : "text-warning"
                }`}>
                  {metric.status}
                </span>
              </div>
              <div className="text-2xl font-bold font-mono">{metric.value}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EnvironmentalContext;
