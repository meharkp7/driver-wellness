import Wave from 'react-wavify';

export const WaveBackground = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Multiple wave layers for depth */}
      <div className="absolute inset-0 opacity-20">
        <Wave
          fill="url(#wave-gradient-1)"
          paused={false}
          options={{
            height: 40,
            amplitude: 30,
            speed: 0.15,
            points: 4
          }}
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: '60%'
          }}
        />
      </div>
      
      <div className="absolute inset-0 opacity-15">
        <Wave
          fill="url(#wave-gradient-2)"
          paused={false}
          options={{
            height: 60,
            amplitude: 40,
            speed: 0.12,
            points: 5
          }}
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: '50%'
          }}
        />
      </div>
      
      <div className="absolute inset-0 opacity-10">
        <Wave
          fill="url(#wave-gradient-3)"
          paused={false}
          options={{
            height: 80,
            amplitude: 50,
            speed: 0.1,
            points: 3
          }}
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: '40%'
          }}
        />
      </div>

      {/* SVG Gradients */}
      <svg width="0" height="0">
        <defs>
          <linearGradient id="wave-gradient-1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(145, 65%, 42%)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="hsl(145, 65%, 42%)" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="wave-gradient-2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(155, 70%, 38%)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="hsl(155, 70%, 38%)" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id="wave-gradient-3" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(140, 35%, 65%)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="hsl(140, 35%, 65%)" stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
