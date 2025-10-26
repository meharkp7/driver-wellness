import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { format } from "date-fns";

interface Trip {
  id: number | string;
  date: string;
  duration: string;
  distance: string;
  avgFatigue: number;
  alerts: number;
}

interface DailyData {
  date: string;
  fatigue: number;
  trips: number;
  alerts: number;
  distance?: number;
}

interface Stat {
  label: string;
  value: string;
  change: string;
  trend: string;
}

export const exportToPDF = (
  trips: Trip[],
  dailyData: DailyData[],
  stats: Stat[]
) => {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(20);
  doc.setTextColor(59, 130, 246); // primary color
  doc.text("Driving Safety Report", 14, 20);
  
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Generated: ${format(new Date(), "PPP")}`, 14, 28);
  
  // Summary Stats
  doc.setFontSize(14);
  doc.setTextColor(0);
  doc.text("Summary Statistics", 14, 40);
  
  const statsData = stats.map(stat => [
    stat.label,
    stat.value,
    stat.change,
    stat.trend === "up" ? "↑" : "↓"
  ]);
  
  autoTable(doc, {
    startY: 45,
    head: [["Metric", "Value", "Change", "Trend"]],
    body: statsData,
    theme: "striped",
    headStyles: { fillColor: [59, 130, 246] }
  });
  
  // Daily Performance
  const finalY = (doc as any).lastAutoTable.finalY || 45;
  doc.setFontSize(14);
  doc.text("Daily Performance", 14, finalY + 15);
  
  const dailyTableData = dailyData.slice(0, 10).map(day => [
    day.date,
    day.fatigue.toString(),
    day.trips.toString(),
    day.alerts.toString()
  ]);
  
  autoTable(doc, {
    startY: finalY + 20,
    head: [["Date", "Fatigue Score", "Trips", "Alerts"]],
    body: dailyTableData,
    theme: "striped",
    headStyles: { fillColor: [59, 130, 246] }
  });
  
  // Recent Trips
  const finalY2 = (doc as any).lastAutoTable.finalY;
  doc.addPage();
  doc.setFontSize(14);
  doc.text("Recent Trips", 14, 20);
  
  const tripsData = trips.map(trip => [
    trip.date,
    trip.duration,
    trip.distance,
    trip.avgFatigue.toString(),
    trip.alerts.toString()
  ]);
  
  autoTable(doc, {
    startY: 25,
    head: [["Date", "Duration", "Distance", "Avg Fatigue", "Alerts"]],
    body: tripsData,
    theme: "striped",
    headStyles: { fillColor: [59, 130, 246] }
  });
  
  doc.save(`driving-report-${format(new Date(), "yyyy-MM-dd")}.pdf`);
};

export const exportToCSV = (trips: Trip[]) => {
  const headers = ["Date", "Duration", "Distance", "Avg Fatigue", "Alerts"];
  const rows = trips.map(trip => [
    trip.date,
    trip.duration,
    trip.distance,
    trip.avgFatigue,
    trip.alerts
  ]);
  
  const csvContent = [
    headers.join(","),
    ...rows.map(row => row.join(","))
  ].join("\n");
  
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  
  link.setAttribute("href", url);
  link.setAttribute("download", `driving-report-${format(new Date(), "yyyy-MM-dd")}.csv`);
  link.style.visibility = "hidden";
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
