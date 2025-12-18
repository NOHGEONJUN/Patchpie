import React, { useRef, useEffect, useState } from 'react';
import { ScrollVideoProps } from './types';
import { Loader2 } from 'lucide-react';

export const ScrollVideoContainer: React.FC<ScrollVideoProps> = ({ 
  src, 
  scrollLength = '400vh', 
  children 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Ref to store the desired time based on scroll position.
  // Using ref instead of state to avoid re-renders during the high-frequency loop.
  const targetTimeRef = useRef<number>(0);
  
  // Helper to handle metadata loading
  const handleLoadedMetadata = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;

    if (!video || !container) return;

    // 1. Setup Scroll Listener (The Decoupling)
    // We only calculate the 'target' time here. We do NOT touch the video element.
    const handleScroll = () => {
      // Get the bounding rectangle of the tall container
      const containerRect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far we've scrolled into the container
      // The container starts at top 0, so containerRect.top is negative as we scroll down
      const scrollDistance = -containerRect.top;
      
      // The total scrollable distance is container height - viewport height
      // (because the video is sticky for the duration of the container)
      const maxScroll = containerRect.height - windowHeight;

      if (maxScroll <= 0) return;

      // Normalize between 0 and 1
      const progress = Math.max(0, Math.min(1, scrollDistance / maxScroll));
      
      if (Number.isNaN(video.duration)) return;

      // Update the target time
      targetTimeRef.current = progress * video.duration;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // 2. Setup Render Loop (RequestAnimationFrame)
    // This handles the actual DOM updates to the video element.
    let animationFrameId: number;

    const renderLoop = () => {
      if (video) {
        // Easing factor: 0.1 means we move 10% of the way to the target per frame.
        // This creates a smooth "weighty" feel and masks keyframe seeking stutter.
        const easing = 0.15; 
        
        // Calculate difference between current state and target state
        const diff = targetTimeRef.current - video.currentTime;
        
        // Only update if the difference is significant enough to matter visualy
        if (Math.abs(diff) > 0.01) {
          
          // CRITICAL: Seeking Guard
          // If the video is currently seeking (decoding a frame), we skip this update
          // to prevent stacking seek requests which causes jank/stutter.
          if (!video.seeking) {
             video.currentTime += diff * easing;
          }
        }
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    // Start the loop
    renderLoop();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full bg-slate-50"
      style={{ height: scrollLength }}
    >
      {/* Sticky wrapper to keep video fixed while container scrolls */}
      <div className="sticky top-0 left-0 h-screen w-full overflow-hidden">
        
        {/* Loading State - Light Theme */}
        {isLoading && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-slate-50 text-amber-600">
            <Loader2 className="h-10 w-10 animate-spin" />
            <span className="ml-3 font-serif text-lg tracking-widest text-slate-800">이야기 로딩 중...</span>
          </div>
        )}

        <video
          ref={videoRef}
          src={src}
          className="absolute inset-0 h-full w-full object-cover"
          preload="auto"
          muted
          playsInline
          onLoadedMetadata={handleLoadedMetadata}
        />
        
        {/* Optional light overlay to ensure dark text pops if video is very dark, 
            or keep transparent to see video clearly. 
            Removed dark overlay for white theme request. 
        */}
      </div>

      {/* Content Overlay passed as children */}
      <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none">
        {children}
      </div>
    </div>
  );
};
