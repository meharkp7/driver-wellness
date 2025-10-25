import { User, Mail, Phone, MapPin, Calendar, Award, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/ui/page-transition";
import { GradientBackground } from "@/components/ui/gradient-background";

const Profile = () => {
  const driverInfo = {
    name: "Alex Thompson",
    email: "alex.thompson@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    licenseNumber: "D1234567",
    memberSince: "January 2024",
    totalTrips: 87,
    totalHours: 124,
    avgFatigue: 76,
    safetyScore: 94,
  };

  const achievements = [
    { icon: Award, label: "Safe Driver", description: "100+ hours without critical alerts", color: "success" },
    { icon: Clock, label: "Night Owl", description: "Completed 50 night drives safely", color: "primary" },
    { icon: Award, label: "Early Bird", description: "Best performance in morning hours", color: "warning" },
  ];

  const preferences = [
    { label: "Alert Sensitivity", value: "High" },
    { label: "Voice Alerts", value: "Enabled" },
    { label: "Haptic Feedback", value: "Enabled" },
    { label: "Night Mode", value: "Auto" },
    { label: "Break Reminders", value: "Every 90 min" },
  ];

  return (
    <PageTransition>
      <div className="relative">
        <GradientBackground />
        <div className="relative z-10 space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Driver Profile</h2>
        <Button className="bg-primary hover:bg-primary/90">Edit Profile</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-xl p-6 space-y-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-gradient-primary flex items-center justify-center mb-4">
                <User className="w-12 h-12 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold">{driverInfo.name}</h3>
              <p className="text-sm text-muted-foreground">Licensed Driver</p>
              <div className="mt-4 px-4 py-2 bg-success/20 text-success rounded-full text-sm font-medium">
                Safety Score: {driverInfo.safetyScore}/100
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-border">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span>{driverInfo.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span>{driverInfo.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span>{driverInfo.location}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span>Member since {driverInfo.memberSince}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <div className="text-xs text-muted-foreground mb-1">License Number</div>
              <div className="font-mono text-sm">{driverInfo.licenseNumber}</div>
            </div>
          </div>
        </div>

        {/* Stats & Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Driving Stats */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4">Driving Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-secondary/50 rounded-lg">
                <div className="text-3xl font-bold font-mono mb-1">{driverInfo.totalTrips}</div>
                <div className="text-xs text-muted-foreground">Total Trips</div>
              </div>
              <div className="p-4 bg-secondary/50 rounded-lg">
                <div className="text-3xl font-bold font-mono mb-1">{driverInfo.totalHours}h</div>
                <div className="text-xs text-muted-foreground">Total Hours</div>
              </div>
              <div className="p-4 bg-secondary/50 rounded-lg">
                <div className="text-3xl font-bold font-mono mb-1">{driverInfo.avgFatigue}</div>
                <div className="text-xs text-muted-foreground">Avg Fatigue</div>
              </div>
              <div className="p-4 bg-secondary/50 rounded-lg">
                <div className="text-3xl font-bold font-mono mb-1">{driverInfo.safetyScore}</div>
                <div className="text-xs text-muted-foreground">Safety Score</div>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4">Achievements</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {achievements.map((achievement) => {
                const Icon = achievement.icon;
                return (
                  <div
                    key={achievement.label}
                    className={`p-4 rounded-lg border-2 ${
                      achievement.color === "success" ? "bg-success/10 border-success/30" :
                      achievement.color === "primary" ? "bg-primary/10 border-primary/30" :
                      "bg-warning/10 border-warning/30"
                    }`}
                  >
                    <Icon className={`w-8 h-8 mb-2 ${
                      achievement.color === "success" ? "text-success" :
                      achievement.color === "primary" ? "text-primary" : "text-warning"
                    }`} />
                    <h4 className="font-bold mb-1">{achievement.label}</h4>
                    <p className="text-xs text-muted-foreground">{achievement.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4">Alert Preferences</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {preferences.map((pref) => (
                <div key={pref.label} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                  <span className="text-sm text-muted-foreground">{pref.label}</span>
                  <span className="text-sm font-semibold font-mono">{pref.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Profile;
