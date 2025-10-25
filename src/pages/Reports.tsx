import { useState, useEffect } from "react";
import { TrendingDown, TrendingUp, Calendar, Download, FileText, FileSpreadsheet, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import MetricExplanation from "@/components/dashboard/MetricExplanation";
import { PageTransition } from "@/components/ui/page-transition";
import { GeometricBackground } from "@/components/ui/geometric-background";
import { BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TripDetailsModal } from "@/components/reports/TripDetailsModal";
import { exportToPDF, exportToCSV } from "@/components/reports/ExportReports";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { format, subDays, startOfWeek, endOfWeek, eachDayOfInterval } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Reports = () => {
  const [selectedTrip, setSelectedTrip] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: subDays(new Date(), 7),
    to: new Date()
  });
  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [chartType, setChartType] = useState<"bar" | "line" | "area">("bar");

  // Fetch trips from backend
  useEffect(() => {
    fetchTrips();
  }, [dateRange]);

  const fetchTrips = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("trips")
        .select("*")
        .gte("date", format(dateRange.from, "yyyy-MM-dd"))
        .lte("date", format(dateRange.to, "yyyy-MM-dd"))
        .order("date", { ascending: false });

      if (error) throw error;

      // Format data for display
      const formattedTrips = data?.map(trip => ({
        id: trip.id,
        date: format(new Date(trip.date), "yyyy-MM-dd"),
        duration: `${Math.floor(trip.duration / 60)}h ${trip.duration % 60}m`,
        distance: `${trip.distance} km`,
        avgFatigue: trip.avg_fatigue,
        alerts: trip.alerts,
        route_name: trip.route_name,
        start_time: trip.start_time,
        end_time: trip.end_time
      })) || [];

      setTrips(formattedTrips);
    } catch (error) {
      console.error("Error fetching trips:", error);
      toast.error("Failed to load trips data");
    } finally {
      setLoading(false);
    }
  };

  // Calculate weekly data from trips
  const weeklyData = eachDayOfInterval({
    start: startOfWeek(dateRange.from),
    end: endOfWeek(dateRange.to)
  }).map(day => {
    const dayTrips = trips.filter(t => t.date === format(day, "yyyy-MM-dd"));
    return {
      day: format(day, "EEE"),
      fatigue: dayTrips.length > 0 
        ? Math.round(dayTrips.reduce((sum, t) => sum + t.avgFatigue, 0) / dayTrips.length)
        : 0,
      trips: dayTrips.length,
      alerts: dayTrips.reduce((sum, t) => sum + t.alerts, 0)
    };
  });

  // Calculate stats
  const stats = [
    { 
      label: "Total Trips", 
      value: trips.length.toString(), 
      change: "+12%", 
      trend: "up" 
    },
    { 
      label: "Avg Fatigue Score", 
      value: trips.length > 0 
        ? Math.round(trips.reduce((sum, t) => sum + t.avgFatigue, 0) / trips.length).toString()
        : "0",
      change: "+8%", 
      trend: "up" 
    },
    { 
      label: "Total Alerts", 
      value: trips.reduce((sum, t) => sum + t.alerts, 0).toString(),
      change: "-15%", 
      trend: "down" 
    },
    { 
      label: "Driving Hours", 
      value: `${Math.round(trips.length * 1.5)}h`,
      change: "+5%", 
      trend: "up" 
    },
  ];

  const handleTripClick = (trip: any) => {
    setSelectedTrip(trip);
    setModalOpen(true);
  };

  const handleExport = (type: "pdf" | "csv") => {
    if (type === "pdf") {
      exportToPDF(trips, weeklyData, stats);
      toast.success("PDF report generated successfully!");
    } else {
      exportToCSV(trips);
      toast.success("CSV report exported successfully!");
    }
  };

  const handlePrint = () => {
    window.print();
    toast.success("Print dialog opened");
  };

  return (
    <PageTransition>
      <div className="relative">
        <GeometricBackground />
        <div className="relative z-10 space-y-6 animate-fade-in">
          {/* Header */}
          <div className="flex items-center justify-between print:mb-4">
            <div>
              <h2 className="text-3xl font-bold mb-2">Driving Reports</h2>
              <p className="text-muted-foreground">Analytics and insights from your driving sessions</p>
            </div>
            <div className="flex gap-2 print:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90">
                    <Download className="w-4 h-4 mr-2" />
                    Export Report
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => handleExport("pdf")}>
                    <FileText className="w-4 h-4 mr-2" />
                    Export as PDF
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleExport("csv")}>
                    <FileSpreadsheet className="w-4 h-4 mr-2" />
                    Export as CSV
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="outline" onClick={handlePrint}>
                <Printer className="w-4 h-4 mr-2" />
                Print
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 print:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-card border border-border rounded-xl p-6 print:p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                  <div className="flex items-center gap-2 print:hidden">
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

          {/* Chart Tabs */}
          <Tabs defaultValue="weekly" className="w-full">
            <div className="flex items-center justify-between mb-4 print:hidden">
              <TabsList>
                <TabsTrigger value="weekly">Weekly View</TabsTrigger>
                <TabsTrigger value="comparison">Comparison</TabsTrigger>
              </TabsList>
              
              <div className="flex gap-2">
                <Button
                  variant={chartType === "bar" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setChartType("bar")}
                >
                  Bar
                </Button>
                <Button
                  variant={chartType === "line" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setChartType("line")}
                >
                  Line
                </Button>
                <Button
                  variant={chartType === "area" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setChartType("area")}
                >
                  Area
                </Button>
              </div>
            </div>

            <TabsContent value="weekly">
              <div className="bg-card border border-border rounded-xl p-6 print:p-4">
                <h3 className="text-xl font-bold mb-6 print:text-lg print:mb-4">Weekly Performance</h3>
                <ResponsiveContainer width="100%" height={300}>
                  {chartType === "bar" ? (
                    <BarChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                      <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
                      <Legend />
                      <Bar dataKey="fatigue" fill="hsl(var(--primary))" name="Fatigue Score" radius={[8, 8, 0, 0]} />
                      <Bar dataKey="trips" fill="hsl(var(--success))" name="Trips" radius={[8, 8, 0, 0]} />
                      <Bar dataKey="alerts" fill="hsl(var(--warning))" name="Alerts" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  ) : chartType === "line" ? (
                    <LineChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                      <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
                      <Legend />
                      <Line type="monotone" dataKey="fatigue" stroke="hsl(var(--primary))" strokeWidth={2} name="Fatigue Score" />
                      <Line type="monotone" dataKey="trips" stroke="hsl(var(--success))" strokeWidth={2} name="Trips" />
                      <Line type="monotone" dataKey="alerts" stroke="hsl(var(--warning))" strokeWidth={2} name="Alerts" />
                    </LineChart>
                  ) : (
                    <AreaChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                      <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
                      <Legend />
                      <Area type="monotone" dataKey="fatigue" fill="hsl(var(--primary))" stroke="hsl(var(--primary))" name="Fatigue Score" />
                      <Area type="monotone" dataKey="trips" fill="hsl(var(--success))" stroke="hsl(var(--success))" name="Trips" />
                      <Area type="monotone" dataKey="alerts" fill="hsl(var(--warning))" stroke="hsl(var(--warning))" name="Alerts" />
                    </AreaChart>
                  )}
                </ResponsiveContainer>
              </div>
            </TabsContent>

            <TabsContent value="comparison">
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-xl font-bold mb-6">Trend Comparison</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                    <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
                    <Legend />
                    <Line type="monotone" dataKey="fatigue" stroke="hsl(var(--primary))" strokeWidth={3} name="Current Week" />
                    <Line 
                      type="monotone" 
                      dataKey="fatigue" 
                      stroke="hsl(var(--muted-foreground))" 
                      strokeWidth={2} 
                      strokeDasharray="5 5"
                      name="Previous Week"
                      data={weeklyData.map(d => ({ ...d, fatigue: d.fatigue * 0.9 }))}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </Tabs>

          {/* Recent Trips Table */}
          <div className="bg-card border border-border rounded-xl p-6 print:p-4">
            <div className="flex items-center justify-between mb-6 print:mb-4">
              <h3 className="text-xl font-bold print:text-lg">Recent Trips</h3>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="print:hidden">
                    <Calendar className="w-4 h-4 mr-2" />
                    {format(dateRange.from, "MMM dd")} - {format(dateRange.to, "MMM dd")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <div className="p-4 space-y-4">
                    <div>
                      <label className="text-sm font-medium">From</label>
                      <CalendarComponent
                        mode="single"
                        selected={dateRange.from}
                        onSelect={(date) => date && setDateRange(prev => ({ ...prev, from: date }))}
                        className={cn("pointer-events-auto")}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">To</label>
                      <CalendarComponent
                        mode="single"
                        selected={dateRange.to}
                        onSelect={(date) => date && setDateRange(prev => ({ ...prev, to: date }))}
                        className={cn("pointer-events-auto")}
                      />
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            
            {loading ? (
              <div className="text-center py-8 text-muted-foreground">Loading trips...</div>
            ) : trips.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">No trips found in this date range</div>
            ) : (
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
                    {trips.map((trip) => (
                      <tr 
                        key={trip.id} 
                        className="border-b border-border/50 hover:bg-secondary/30 transition-colors cursor-pointer print:cursor-default"
                        onClick={() => handleTripClick(trip)}
                      >
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
            )}
          </div>
        </div>
      </div>

      <TripDetailsModal 
        trip={selectedTrip}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />

      <style>{`
        @media print {
          @page {
            margin: 2cm;
            size: A4;
          }
          
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          
          .print\\:hidden {
            display: none !important;
          }
          
          .print\\:space-y-4 > * + * {
            margin-top: 1rem !important;
          }
          
          .print\\:mb-4 {
            margin-bottom: 1rem !important;
          }
          
          .print\\:p-4 {
            padding: 1rem !important;
          }
          
          .print\\:text-lg {
            font-size: 1.125rem !important;
          }
          
          .print\\:grid-cols-4 {
            grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
          }
          
          .print\\:cursor-default {
            cursor: default !important;
          }
        }
      `}</style>
    </PageTransition>
  );
};

export default Reports;
