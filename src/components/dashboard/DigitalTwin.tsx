import { useEffect, useState } from "react";
import { Brain, Heart, Activity, Smile, Frown, Zap, Wind, Eye, Gauge, Lightbulb } from "lucide-react";
import avatarImage from "@/assets/digital-twin-avatar.png";

interface DigitalTwinProps {
  fatigueLevel: number;
}

type Emotion = "happy" | "stressed" | "tired";

const DigitalTwin = ({ fatigueLevel }: DigitalTwinProps) => {
  const [position, setPosition] = useState({ x: window.innerWidth - 200, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState<Emotion>("happy");

  // Change emotion based on fatigue level with some randomness
  useEffect(() => {
    const emotionInterval = setInterval(() => {
      if (fatigueLevel >= 70) {
        setCurrentEmotion(Math.random() > 0.3 ? "happy" : "stressed");
      } else if (fatigueLevel >= 40) {
        setCurrentEmotion(Math.random() > 0.5 ? "stressed" : "tired");
      } else {
        setCurrentEmotion(Math.random() > 0.3 ? "tired" : "stressed");
      }
    }, 3000); // Change emotion every 3 seconds

    return () => clearInterval(emotionInterval);
  }, [fatigueLevel]);

  // Calculate overlay position to prevent overflow
  const getOverlayPosition = () => {
    const overlayWidth = 320; // w-80 = 320px
    const overlayHeight = 220; // approximate height
    const margin = 16; // ml-4 = 16px

    const shouldShowLeft = position.x + 96 + margin + overlayWidth > window.innerWidth;
    const shouldShowAbove = position.y + overlayHeight > window.innerHeight;

    return {
      horizontal: shouldShowLeft ? 'left' : 'right',
      vertical: shouldShowAbove ? 'bottom' : 'top'
    };
  };

  const overlayPos = getOverlayPosition();

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: Math.max(0, Math.min(window.innerWidth - 180, e.clientX - dragOffset.x)),
        y: Math.max(0, Math.min(window.innerHeight - 200, e.clientY - dragOffset.y))
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove as any);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove as any);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  const getStatusColor = () => {
    if (fatigueLevel >= 70) return "hsl(145 70% 48%)";
    if (fatigueLevel >= 40) return "hsl(38 95% 55%)";
    return "hsl(0 85% 52%)";
  };

  const getEmotionIcon = () => {
    switch (currentEmotion) {
      case "happy": return Smile;
      case "stressed": return Zap;
      case "tired": return Frown;
    }
  };

  const getEmotionLabel = () => {
    switch (currentEmotion) {
      case "happy": return "Alert";
      case "stressed": return "Stressed";
      case "tired": return "Fatigued";
    }
  };

  const getSuggestion = () => {
    if (fatigueLevel >= 70 && currentEmotion === "happy") {
      return "You're doing great! Keep up the focus.";
    } else if (fatigueLevel >= 70 && currentEmotion === "stressed") {
      return "Take deep breaths - you're still alert.";
    } else if (fatigueLevel >= 40 && currentEmotion === "stressed") {
      return "Consider a short break to reduce stress.";
    } else if (fatigueLevel >= 40 && currentEmotion === "tired") {
      return "Rest stop recommended in the next 30 minutes.";
    } else if (currentEmotion === "tired") {
      return "Pull over safely - fatigue levels are critical.";
    } else {
      return "Monitor your stress and take breaks as needed.";
    }
  };

  const statusColor = getStatusColor();
  const statusLabel = fatigueLevel >= 70 ? "Alert" : fatigueLevel >= 40 ? "Moderate" : "Critical";
  const EmotionIcon = getEmotionIcon();
  const emotionLabel = getEmotionLabel();
  const suggestion = getSuggestion();

  return (
    <div
      className="fixed z-50 select-none"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transition: isDragging ? 'none' : 'all 0.2s ease-out'
      }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Compact Avatar Circle */}
      <div 
        className="relative cursor-move"
        onMouseDown={handleMouseDown}
      >
        {/* Avatar Circle */}
        <div 
          className="relative w-24 h-24 rounded-full overflow-hidden border-4 transition-all duration-500"
          style={{ 
            borderColor: statusColor,
            boxShadow: `0 4px 20px ${statusColor}80, 0 0 40px ${statusColor}50`
          }}
        >
          <img 
            src={avatarImage} 
            alt="Digital Twin" 
            className="w-full h-full object-cover transition-all duration-500"
            style={{
              filter: currentEmotion === "tired" ? "grayscale(0.3) brightness(0.8)" :
                      currentEmotion === "stressed" ? "contrast(1.2) saturate(1.3)" :
                      "brightness(1.1) saturate(1.1)"
            }}
          />
          
          {/* Emotion indicator overlay */}
          <div 
            className="absolute inset-0 rounded-full flex items-center justify-center transition-all duration-500"
            style={{
              background: currentEmotion === "tired" 
                ? "linear-gradient(180deg, transparent 50%, rgba(0, 0, 0, 0.4) 100%)"
                : currentEmotion === "stressed"
                ? "radial-gradient(circle, transparent 30%, rgba(255, 100, 0, 0.15) 100%)"
                : "radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 60%)"
            }}
          >
            <EmotionIcon 
              className="w-6 h-6 transition-all duration-500 opacity-60"
              style={{ 
                color: statusColor,
                filter: "drop-shadow(0 0 8px rgba(0,0,0,0.8))"
              }}
            />
          </div>
          
          {/* Pulse ring */}
          <div 
            className="absolute inset-0 rounded-full border-2 pointer-events-none"
            style={{ 
              borderColor: statusColor,
              animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite'
            }}
          />
        </div>

        {/* Floating particles around avatar */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full pointer-events-none"
            style={{
              background: statusColor,
              top: `${50 + Math.sin(Date.now() / 1000 + i * 1) * 40}%`,
              left: `${50 + Math.cos(Date.now() / 1000 + i * 1) * 40}%`,
              opacity: 0.6,
              animation: `float ${2 + i * 0.3}s ease-in-out infinite`,
              boxShadow: `0 0 6px ${statusColor}`,
              animationDelay: `${i * 0.2}s`
            }}
          />
        ))}

        {/* Emotion badge on avatar */}
        <div 
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-xl border-2 pointer-events-none transition-all duration-500 shadow-lg"
          style={{
            background: `linear-gradient(135deg, ${statusColor}40, ${statusColor}20)`,
            borderColor: statusColor,
            color: "white",
            textShadow: "0 1px 2px rgba(0,0,0,0.8)",
            boxShadow: `0 2px 12px ${statusColor}60`
          }}
        >
          {emotionLabel}
        </div>
      </div>

      {/* Overlay Details - Shows on Hover */}
      {isExpanded && (
        <div 
          className="absolute border-2 rounded-2xl shadow-2xl p-5 w-96 animate-fade-in pointer-events-none"
          style={{
            background: "linear-gradient(135deg, rgba(12, 17, 15, 0.98), rgba(20, 30, 25, 0.98))",
            backdropFilter: "blur(20px)",
            borderColor: statusColor,
            boxShadow: `0 8px 40px rgba(0,0,0,0.6), 0 0 60px ${statusColor}50, inset 0 1px 0 rgba(255,255,255,0.1)`,
            [overlayPos.horizontal === 'right' ? 'left' : 'right']: '100%',
            [overlayPos.horizontal === 'right' ? 'marginLeft' : 'marginRight']: '16px',
            [overlayPos.vertical]: '0'
          }}
        >
          <div className="mb-4 pb-3 border-b border-border">
            <h3 className="text-base font-bold text-foreground mb-1 flex items-center gap-2">
              <Activity className="w-4 h-4" style={{ color: statusColor }} />
              Digital Twin Monitor
            </h3>
            <p className="text-xs text-muted-foreground">Real-time Wellness Analysis</p>
          </div>

          {/* AI Suggestion */}
          <div 
            className="mb-4 p-3 rounded-lg flex items-start gap-2"
            style={{ 
              background: `linear-gradient(135deg, ${statusColor}15, ${statusColor}05)`,
              border: `1px solid ${statusColor}30`
            }}
          >
            <Lightbulb className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: statusColor }} />
            <p className="text-xs text-foreground/90 leading-relaxed">{suggestion}</p>
          </div>

          <div className="space-y-2">
            {/* Current Emotion */}
            <div 
              className="flex items-center justify-between p-2.5 rounded-lg transition-all duration-300"
              style={{ 
                background: `linear-gradient(135deg, ${statusColor}20, ${statusColor}08)`,
                border: `1px solid ${statusColor}40`
              }}
            >
              <div className="flex items-center gap-2">
                <EmotionIcon className="w-4 h-4" style={{ color: statusColor }} />
                <span className="text-xs font-medium text-foreground">Emotion</span>
              </div>
              <span className="text-xs font-bold" style={{ color: statusColor }}>
                {emotionLabel}
              </span>
            </div>

            {/* Alertness */}
            <div 
              className="flex items-center justify-between p-2.5 rounded-lg"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-primary" />
                <span className="text-xs font-medium text-foreground">Alertness</span>
              </div>
              <span className="text-xs font-mono font-bold text-foreground">
                {fatigueLevel}%
              </span>
            </div>

            {/* Heart Rate */}
            <div 
              className="flex items-center justify-between p-2.5 rounded-lg"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-destructive" />
                <span className="text-xs font-medium text-foreground">Heart Rate</span>
              </div>
              <span className="text-xs font-mono font-bold text-foreground">72 BPM</span>
            </div>

            {/* Breath Rate */}
            <div 
              className="flex items-center justify-between p-2.5 rounded-lg"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="flex items-center gap-2">
                <Wind className="w-4 h-4 text-info" />
                <span className="text-xs font-medium text-foreground">Breath Rate</span>
              </div>
              <span className="text-xs font-mono font-bold text-foreground">16/min</span>
            </div>

            {/* Eye Blink Rate */}
            <div 
              className="flex items-center justify-between p-2.5 rounded-lg"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-warning" />
                <span className="text-xs font-medium text-foreground">Blink Rate</span>
              </div>
              <span className="text-xs font-mono font-bold text-foreground">
                {currentEmotion === "tired" ? "Low" : "Normal"}
              </span>
            </div>

            {/* Stress Level */}
            <div 
              className="flex items-center justify-between p-2.5 rounded-lg"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="flex items-center gap-2">
                <Gauge className="w-4 h-4 text-accent" />
                <span className="text-xs font-medium text-foreground">Stress Level</span>
              </div>
              <span className="text-xs font-mono font-bold text-foreground">
                {currentEmotion === "stressed" ? "High" : currentEmotion === "tired" ? "Moderate" : "Low"}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DigitalTwin;
