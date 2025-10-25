import { TrendingDown, TrendingUp, Calendar, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import MetricExplanation from "@/components/dashboard/MetricExplanation";
import { PageTransition } from "@/components/ui/page-transition";
import { GeometricBackground } from "@/components/ui/geometric-background";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const Reports = () => {
  const weeklyData = [
    { day: "Mon", fatigue: 75, trips: 3, alerts: 2 },
    { day: "Tue", fatigue: 68, trips: 2, alerts: 4 },
    { day: "Wed", fatigue: 82, trips: 4, alerts: 1 },
    { day: "Thu", fatigue: 71, trips: 3, alerts: 3 },
    { day: "Fri", fatigue: 65, trips: 2, alerts: 5 },
    { day: "Sat", fatigue: 88, trips: 1, alerts: 0 },
    { day: "Sun", fatigue: 90, trips: 1, alerts: 0 },
  ];

  const recentTrips = [
    { id: 1, date: "2025-10-24", duration: "2h 34m", distance: "142 km", avgFatigue: 72, alerts: 3 },
    { id: 2, date: "2025-10-23", duration: "1h 15m", distance: "68 km", avgFatigue: 85, alerts: 1 },
    { id: 3, date: "2025-10-22", duration: "3h 45m", distance: "215 km", avgFatigue: 58, alerts: 7 },
    { id: 4, date: "2025-10-21", duration: "0h 42m", distance: "35 km", avgFatigue: 91, alerts: 0 },
  ];

  const stats = [
    { label: "Total Trips", value: "87", change: "+12%", trend: "up" },
    { label: "Avg Fatigue Score", value: "76", change: "+8%", trend: "up" },
    { label: "Total Alerts", value: "142", change: "-15%", trend: "down" },
    { label: "Driving Hours", value: "124h", change: "+5%", trend: "up" },
  ];

  return (
    <PageTransition>
      <div className="relative">
        <GeometricBackground />
        <div className="relative z-10 space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2">Driving Reports</h2>
          <p className="text-muted-foreground">Analytics and insights from your driving sessions</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">{stat.label}</span>
              <div className="flex items-center gap-2">
                <span className={`flex items-center gap-1 text-xs font-medium ${
                  stat.trend === "up" ? "text-success" : "text-destructive"
                }`}>
                  {stat.trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {stat.change}
                </span>
                <MetricExplanation 
                  metric={stat.label} 
                  value={stat.value}
                  context={{ trend: stat.trend, change: stat.change }}
                />
              </div>
            </div>
            <div className="text-3xl font-bold font-mono">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Weekly Chart */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-xl font-bold mb-6">Weekly Performance</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis 
              dataKey="day" 
              stroke="hsl(var(--muted-foreground))"
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                color: "hsl(var(--foreground))"
              }}
              labelStyle={{ color: "hsl(var(--foreground))", fontWeight: "bold" }}
            />
            <Legend 
              wrapperStyle={{ paddingTop: "20px" }}
              iconType="circle"
            />
            <Bar 
              dataKey="fatigue" 
              fill="hsl(var(--primary))" 
              radius={[8, 8, 0, 0]}
              name="Fatigue Score"
            />
            <Bar 
              dataKey="trips" 
              fill="hsl(var(--success))" 
              radius={[8, 8, 0, 0]}
              name="Trips"
            />
            <Bar 
              dataKey="alerts" 
              fill="hsl(var(--warning))" 
              radius={[8, 8, 0, 0]}
              name="Alerts"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Trips Table */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">Recent Trips</h3>
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Filter by Date
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Duration</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Distance</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Avg Fatigue</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Alerts</th>
              </tr>
            </thead>
            <tbody>
              {recentTrips.map((trip) => (
                <tr key={trip.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                  <td className="py-4 px-4 font-mono text-sm">{trip.date}</td>
                  <td className="py-4 px-4 font-mono text-sm">{trip.duration}</td>
                  <td className="py-4 px-4 font-mono text-sm">{trip.distance}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-mono font-medium ${
                      trip.avgFatigue >= 70 ? "bg-success/20 text-success" :
                      trip.avgFatigue >= 50 ? "bg-warning/20 text-warning" :
                      "bg-destructive/20 text-destructive"
                    }`}>
                      {trip.avgFatigue}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`font-mono text-sm ${
                      trip.alerts === 0 ? "text-success" :
                      trip.alerts <= 3 ? "text-warning" : "text-destructive"
                    }`}>
                      {trip.alerts}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Reports;
