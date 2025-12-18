import React from 'react';

export interface ScrollVideoProps {
  src: string;
  scrollLength?: string; // e.g., '300vh', '4000px'
  children?: React.ReactNode;
}

export interface SectionProps {
  title: string;
  description: string;
  alignment: 'left' | 'center' | 'right';
}