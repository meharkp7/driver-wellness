import { AlertTriangle, PhoneCall } from "lucide-react";

const EmergencyOverlay = () => {
  return (
    <div className="fixed inset-0 z-50 bg-destructive/95 backdrop-blur-lg flex items-center justify-center animate-fade-in">
      <div className="text-center space-y-8 px-6">
        <div className="flex justify-center">
          <div className="relative">
            <AlertTriangle className="w-32 h-32 text-white animate-pulse-glow" />
            <div className="absolute inset-0 animate-ping">
              <AlertTriangle className="w-32 h-32 text-white opacity-75" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-white">EMERGENCY MODE ACTIVATED</h1>
          <p className="text-2xl text-white/90">Driver Unresponsive Detected</p>
        </div>

        <div className="space-y-3 max-w-md mx-auto">
          <div className="p-4 bg-white/20 backdrop-blur rounded-xl border-2 border-white/50">
            <p className="text-lg text-white font-medium">🚗 Vehicle slowing down safely</p>
          </div>
          <div className="p-4 bg-white/20 backdrop-blur rounded-xl border-2 border-white/50">
            <p className="text-lg text-white font-medium">⚠️ Hazard lights activated</p>
          </div>
          <div className="p-4 bg-white/20 backdrop-blur rounded-xl border-2 border-white/50">
            <p className="text-lg text-white font-medium">📞 Emergency services notified</p>
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <button className="px-8 py-4 bg-white text-destructive rounded-xl font-bold text-lg hover:bg-white/90 transition-all duration-300 flex items-center gap-2">
            <PhoneCall className="w-6 h-6" />
            Call Emergency
          </button>
          <button 
            onClick={() => window.location.reload()} 
            className="px-8 py-4 bg-white/20 backdrop-blur text-white border-2 border-white rounded-xl font-bold text-lg hover:bg-white/30 transition-all duration-300"
          >
            I'm OK - Dismiss
          </button>
        </div>

        <div className="text-sm text-white/70 font-mono">
          Emergency protocol initiated at {new Date().toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default EmergencyOverlay;
