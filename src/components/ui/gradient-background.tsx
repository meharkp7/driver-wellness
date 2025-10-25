export const GradientBackground = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Animated gradient layers - green theme */}
      <div 
        className="absolute inset-0 opacity-35"
        style={{
          background: 'radial-gradient(ellipse at 20% 30%, hsl(145, 65%, 25%) 0%, transparent 60%)',
          animation: 'gradient-shift 15s ease-in-out infinite',
        }}
      />
      
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse at 80% 70%, hsl(155, 70%, 20%) 0%, transparent 60%)',
          animation: 'gradient-shift 12s ease-in-out infinite reverse',
        }}
      />
      
      <div 
        className="absolute inset-0 opacity-25"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, hsl(140, 50%, 18%) 0%, transparent 70%)',
          animation: 'gradient-shift 18s ease-in-out infinite',
          animationDelay: '3s',
        }}
      />

      <style>{`
        @keyframes gradient-shift {
          0%, 100% {
            transform: translate(0%, 0%) scale(1);
            opacity: 0.4;
          }
          25% {
            transform: translate(5%, -5%) scale(1.1);
            opacity: 0.5;
          }
          50% {
            transform: translate(-3%, 3%) scale(0.95);
            opacity: 0.35;
          }
          75% {
            transform: translate(-5%, -3%) scale(1.05);
            opacity: 0.45;
          }
        }
      `}</style>
    </div>
  );
};
