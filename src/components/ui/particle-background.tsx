export const ParticleBackground = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Subtle animated gradient layers */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(circle at 30% 40%, hsl(145, 65%, 30%) 0%, transparent 50%)',
          animation: 'float-subtle 20s ease-in-out infinite',
        }}
      />
      
      <div 
        className="absolute inset-0 opacity-15"
        style={{
          background: 'radial-gradient(circle at 70% 60%, hsl(155, 60%, 25%) 0%, transparent 50%)',
          animation: 'float-subtle 15s ease-in-out infinite reverse',
        }}
      />

      <style>{`
        @keyframes float-subtle {
          0%, 100% {
            transform: translate(0%, 0%) scale(1);
            opacity: 0.2;
          }
          50% {
            transform: translate(3%, 3%) scale(1.05);
            opacity: 0.25;
          }
        }
      `}</style>
    </div>
  );
};
