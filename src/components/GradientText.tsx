'use client';
import { useEffect, useRef, useState } from 'react';

export default function GradientText({ children }: { children: React.ReactNode }) {
  const [isHovering, setIsHovering] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (textRef.current) {
        const rect = textRef.current.getBoundingClientRect();
        setPosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    const element = textRef.current;
    if (element) {
      element.addEventListener('mousemove', handleMouseMove);
      return () => element.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <div className="relative">
      <h1 
        ref={textRef}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className={`text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text relative cursor-pointer transition-all duration-300 hover:drop-shadow-[0_0_30px_rgba(168,85,247,0.3)] ${!isHovering ? 'animate-gradient' : ''}`}
        style={{
          backgroundImage: isHovering 
            ? `radial-gradient(circle at ${position.x}% ${position.y}%, #ffffff 0%, #fde68a 50%, #d97706 100%)`
      : 'linear-gradient(to right, #ffffff, #fde68a, #d97706, #ffffff)',
        backgroundSize: !isHovering ? '400% 100%' : '100% 100%',
      }}
    >
        {children}
      </h1>
    </div>
  );
}
