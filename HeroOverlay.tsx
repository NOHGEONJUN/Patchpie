import React from 'react';
import { SectionProps } from '../types';
import { BookOpen, Sparkles, Feather, Bookmark } from 'lucide-react';

const StorySection: React.FC<SectionProps & { icon: React.ReactNode }> = ({ 
  title, 
  description, 
  alignment,
  icon 
}) => {
  const alignClass = {
    left: 'items-start text-left pl-8 md:pl-24',
    center: 'items-center text-center px-4',
    right: 'items-end text-right pr-8 md:pr-24',
  }[alignment];

  return (
    <div className={`flex h-screen w-full flex-col justify-center ${alignClass}`}>
      {/* Light theme card: White background with blur, shadow, and dark text */}
      <div className="max-w-xl space-y-6 rounded-2xl bg-white/80 p-8 backdrop-blur-md border border-slate-200 shadow-xl transition-transform duration-700 hover:scale-105">
        <div className="text-amber-600 mb-4">
            {icon}
        </div>
        <h2 className="font-serif text-4xl font-bold text-slate-900 drop-shadow-sm md:text-6xl break-keep">
          {title}
        </h2>
        <p className="text-lg leading-relaxed text-slate-700 md:text-xl break-keep">
          {description}
        </p>
      </div>
    </div>
  );
};

export const HeroOverlay: React.FC = () => {
  return (
    <div className="w-full">
      <StorySection 
        title="PatchPie"
        description="Forgotten pieces, Turned into everyday treasures."
        alignment="center"
        icon={<BookOpen className="w-12 h-12" />}
      />
      
      <StorySection 
        title="Seeing Possibilities"
        description="Seeing Possibilities in What Was Discarded"
        alignment="left"
        icon={<Sparkles className="w-12 h-12" />}
      />
      
      <StorySection 
        title="Taking Action"
        description="A Cycle Stitched by Hand"
        alignment="right"
        icon={<Feather className="w-12 h-12" />}
      />
      
      <StorySection 
        title="Enabling Progress"
        description="Where Everyday Life Becomes Participation"
        alignment="center"
        icon={<Bookmark className="w-12 h-12" />}
      />
    </div>
  );
};