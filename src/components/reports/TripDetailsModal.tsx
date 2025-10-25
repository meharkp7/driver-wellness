import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, AlertTriangle, Gauge } from "lucide-react";
import { format } from "date-fns";

interface Trip {
  id: string;
  date: string;
  duration: string;
  distance: string;
  avgFatigue: number;
  alerts: number;
  route_name?: string;
  start_time?: string;
  end_time?: string;
}

interface TripDetailsModalProps {
  trip: Trip | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TripDetailsModal({ trip, open, onOpenChange }: TripDetailsModalProps) {
  if (!trip) return null;

  const getFatigueLabel = (fatigue: number) => {
    if (fatigue >= 70) return { label: "Excellent", color: "success" };
    if (fatigue >= 50) return { label: "Good", color: "warning" };
    return { label: "Needs Rest", color: "destructive" };
  };

  const fatigueStatus = getFatigueLabel(trip.avgFatigue);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Trip Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Trip Overview */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                Date
              </div>
              <p className="text-lg font-mono">{trip.date}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                Duration
              </div>
              <p className="text-lg font-mono">{trip.duration}</p>
            </div>

            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Distance</div>
              <p className="text-lg font-mono">{trip.distance}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <AlertTriangle className="w-4 h-4" />
                Alerts
              </div>
              <p className="text-lg font-mono">{trip.alerts}</p>
            </div>
          </div>

          {/* Fatigue Score */}
          <div className="p-4 border border-border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Gauge className="w-5 h-5 text-primary" />
                <span className="font-semibold">Average Fatigue Score</span>
              </div>
              <Badge variant={fatigueStatus.color === "success" ? "default" : "destructive"}>
                {fatigueStatus.label}
              </Badge>
            </div>
            <div className="text-4xl font-mono font-bold text-primary">{trip.avgFatigue}</div>
            <div className="mt-2 h-2 bg-secondary rounded-full overflow-hidden">
              <div 
                className={`h-full ${
                  trip.avgFatigue >= 70 ? "bg-success" :
                  trip.avgFatigue >= 50 ? "bg-warning" : "bg-destructive"
                }`}
                style={{ width: `${trip.avgFatigue}%` }}
              />
            </div>
          </div>

          {/* Route Info */}
          {trip.route_name && (
            <div className="p-4 bg-secondary/30 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Route</div>
              <p className="font-medium">{trip.route_name}</p>
            </div>
          )}

          {/* Time Details */}
          {trip.start_time && trip.end_time && (
            <div className="grid grid-cols-2 gap-4 p-4 bg-secondary/30 rounded-lg">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Start Time</div>
                <p className="font-mono">{format(new Date(trip.start_time), "HH:mm:ss")}</p>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">End Time</div>
                <p className="font-mono">{format(new Date(trip.end_time), "HH:mm:ss")}</p>
              </div>
            </div>
          )}

          {/* Safety Summary */}
          <div className="p-4 border-l-4 border-primary bg-primary/5 rounded">
            <h4 className="font-semibold mb-2">Safety Summary</h4>
            <p className="text-sm text-muted-foreground">
              {trip.avgFatigue >= 70 
                ? "This was a safe trip with excellent fatigue management. Keep up the good driving habits!"
                : trip.avgFatigue >= 50
                ? "This trip showed moderate fatigue levels. Consider taking more breaks on longer trips."
                : "High fatigue detected during this trip. Please ensure adequate rest before your next drive."}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
