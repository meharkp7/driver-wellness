import { Video } from "lucide-react";

const CameraFeed = () => {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-lg card-hover">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Driver Cabin</h3>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-xs text-muted-foreground font-mono">LIVE</span>
        </div>
      </div>

      <div className="relative aspect-video bg-muted rounded-xl overflow-hidden border border-border/50">
        <div className="absolute inset-0 flex items-center justify-center">
          <Video className="w-12 h-12 text-muted-foreground/50" />
        </div>
        
        {/* Simulated camera overlay */}
        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-lg">
          <span className="text-xs font-mono text-primary">FRONT CAM</span>
        </div>
        
        <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-lg">
          <span className="text-xs font-mono text-foreground">1080p • 30fps</span>
        </div>

        {/* Face detection box simulation */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-40 border-2 border-primary rounded-lg animate-pulse-glow">
          <div className="absolute -top-6 left-0 bg-primary text-primary-foreground px-2 py-0.5 rounded text-xs font-mono">
            Face Detected
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
        <div className="flex items-center gap-2 text-muted-foreground">
          <div className="w-2 h-2 rounded-full bg-success" />
          <span>Eyes Tracking: ON</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <div className="w-2 h-2 rounded-full bg-success" />
          <span>Head Pose: ACTIVE</span>
        </div>
      </div>
    </div>
  );
};

export default CameraFeed;
