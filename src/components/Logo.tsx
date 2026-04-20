import { motion } from 'motion/react';

interface LogoProps {
  variant?: 'icon' | 'horizontal';
  className?: string;
}

export default function Logo({ variant = 'horizontal', className = "" }: LogoProps) {
  const iconSize = variant === 'icon' ? 'w-16 h-16' : 'w-8 h-8';
  
  const Icon = () => (
    <div className={`${iconSize} relative group flex-shrink-0`}>
      {/* Background Rounded Square (App Icon Style) */}
      <div className="absolute inset-0 bg-slate-900 rounded-2xl shadow-xl shadow-brand-blue/20 overflow-hidden">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue via-brand-purple to-brand-violet opacity-40 blur-xl group-hover:opacity-60 transition-opacity" />
      </div>

      {/* SVG Container */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 w-full h-full p-2"
      >
        <defs>
          <linearGradient id="bulbGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="50%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
          <linearGradient id="sparkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#FACC15" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="0.4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Light Bulb Outline */}
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          d="M12 2C8.13 2 5 5.13 5 9C5 11.38 6.19 13.47 8 14.74V17C8 17.55 8.45 18 9 18H15C15.55 18 16 17.55 16 17V14.74C17.81 13.47 19 11.38 19 9C19 5.13 15.87 2 12 2Z"
          stroke="white"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="drop-shadow-[0_0_2px_rgba(255,255,255,0.5)]"
        />
        
        {/* Bulb Bottom Connector */}
        <path
          d="M9 21H15"
          stroke="white"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.6"
        />
        <path
          d="M10 23H14"
          stroke="white"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.4"
        />

        {/* Lightning Bolt */}
        <motion.path
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          d="M13 6L9 11H12L11 16L15 11H12L13 6Z"
          fill="url(#sparkGradient)"
          stroke="#78350F"
          strokeWidth="0.5"
          strokeLinejoin="miter"
          className="drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]"
        />
      </svg>
    </div>
  );

  if (variant === 'icon') {
    return <Icon />;
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Icon />
      <span className="text-2xl font-black text-slate-900 tracking-tighter font-display leading-none">
        AskSpark
      </span>
    </div>
  );
}
