import { Bell, Wifi, Camera, Shield, Smartphone, Volume2, Moon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/ui/page-transition";
import { ParticleBackground } from "@/components/ui/particle-background";

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    cameraFeed: true,
    voiceAlerts: true,
    hapticFeedback: true,
    nightMode: true,
    cloudSync: false,
    dataSharing: false,
    autoEmergency: true,
  });

  const toggleSetting = (key: string) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key as keyof typeof settings] }));
  };

  const Toggle = ({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) => (
    <button
      onClick={onToggle}
      className={`w-12 h-6 rounded-full transition-colors duration-300 ${
        enabled ? "bg-primary" : "bg-muted"
      }`}
    >
      <div
        className={`w-5 h-5 rounded-full bg-white transition-transform duration-300 ${
          enabled ? "translate-x-6" : "translate-x-0.5"
        }`}
      />
    </button>
  );

  const settingsGroups = [
    {
      title: "Monitoring",
      icon: Camera,
      items: [
        { key: "cameraFeed", label: "Camera Feed", description: "Enable real-time driver monitoring", value: settings.cameraFeed },
        { key: "voiceAlerts", label: "Voice Alerts", description: "Audio warnings for fatigue detection", value: settings.voiceAlerts },
        { key: "hapticFeedback", label: "Haptic Feedback", description: "Vibration alerts through steering wheel", value: settings.hapticFeedback },
      ],
    },
    {
      title: "Notifications",
      icon: Bell,
      items: [
        { key: "notifications", label: "Push Notifications", description: "Receive alerts on your device", value: settings.notifications },
        { key: "autoEmergency", label: "Auto Emergency Mode", description: "Activate emergency protocol automatically", value: settings.autoEmergency },
      ],
    },
    {
      title: "Display",
      icon: Moon,
      items: [
        { key: "nightMode", label: "Adaptive Night Mode", description: "Auto-adjust UI for low light conditions", value: settings.nightMode },
      ],
    },
    {
      title: "Privacy & Data",
      icon: Shield,
      items: [
        { key: "cloudSync", label: "Cloud Sync", description: "Backup driving data to cloud", value: settings.cloudSync },
        { key: "dataSharing", label: "Anonymous Analytics", description: "Help improve the system", value: settings.dataSharing },
      ],
    },
  ];

  const alertThresholds = [
    { label: "Fatigue Warning", current: 60, min: 40, max: 80 },
    { label: "Critical Alert", current: 35, min: 20, max: 50 },
    { label: "Break Reminder", current: 90, min: 60, max: 120, unit: "min" },
  ];

  return (
    <PageTransition>
      <div className="relative">
        <ParticleBackground />
        <div className="relative z-10 space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2">System Settings</h2>
          <p className="text-muted-foreground">Configure your driver wellness monitoring system</p>
        </div>
        <Button variant="outline">Reset to Defaults</Button>
      </div>

      {/* Settings Groups */}
      {settingsGroups.map((group) => {
        const Icon = group.icon;
        return (
          <div key={group.title} className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-bold">{group.title}</h3>
            </div>
            <div className="space-y-4">
              {group.items.map((item) => (
                <div key={item.key} className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                  <div className="flex-1">
                    <div className="font-semibold mb-1">{item.label}</div>
                    <div className="text-sm text-muted-foreground">{item.description}</div>
                  </div>
                  <Toggle
                    enabled={item.value}
                    onToggle={() => toggleSetting(item.key)}
                  />
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Alert Thresholds */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-xl font-bold mb-4">Alert Thresholds</h3>
        <div className="space-y-6">
          {alertThresholds.map((threshold) => (
            <div key={threshold.label} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold">{threshold.label}</span>
                <span className="text-sm font-mono bg-primary/20 text-primary px-3 py-1 rounded-full">
                  {threshold.current}{threshold.unit || ''}
                </span>
              </div>
              <div className="relative">
                <input
                  type="range"
                  min={threshold.min}
                  max={threshold.max}
                  value={threshold.current}
                  className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${
                      ((threshold.current - threshold.min) / (threshold.max - threshold.min)) * 100
                    }%, hsl(var(--muted)) ${
                      ((threshold.current - threshold.min) / (threshold.max - threshold.min)) * 100
                    }%, hsl(var(--muted)) 100%)`,
                  }}
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>{threshold.min}{threshold.unit || ''}</span>
                  <span>{threshold.max}{threshold.unit || ''}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Device Integration */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
            <Smartphone className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-xl font-bold">Connected Devices</h3>
        </div>
        <div className="space-y-3">
          {[
            { name: "Smartwatch HR Monitor", status: "Connected", icon: Smartphone },
            { name: "Steering Sensors", status: "Connected", icon: Wifi },
            { name: "Seat Pressure Sensors", status: "Offline", icon: Volume2 },
          ].map((device) => {
            const DeviceIcon = device.icon;
            return (
              <div key={device.name} className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <DeviceIcon className="w-5 h-5 text-muted-foreground" />
                  <span className="font-medium">{device.name}</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  device.status === "Connected" ? "bg-success/20 text-success" : "bg-muted text-muted-foreground"
                }`}>
                  {device.status}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* System Info */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-xl font-bold mb-4">System Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 bg-secondary/30 rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">Version</div>
            <div className="font-mono font-semibold">v2.5.0</div>
          </div>
          <div className="p-3 bg-secondary/30 rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">Last Update</div>
            <div className="font-mono font-semibold">Oct 24, 2025</div>
          </div>
          <div className="p-3 bg-secondary/30 rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">Device ID</div>
            <div className="font-mono font-semibold text-xs">VW-CDM-8X3K9</div>
          </div>
          <div className="p-3 bg-secondary/30 rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">Storage Used</div>
            <div className="font-mono font-semibold">2.3 GB / 10 GB</div>
          </div>
        </div>
        </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Settings;
