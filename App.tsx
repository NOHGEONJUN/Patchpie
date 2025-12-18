import React from 'react';
import { ScrollVideoContainer } from './ScrollVideoContainer';
import { HeroOverlay } from './HeroOverlay';
import { Navbar } from './Navbar';

const App: React.FC = () => {
  return (
    <main className="relative min-h-screen w-full bg-slate-50">
      <Navbar />
      
      {/* 
        The ScrollVideoContainer controls the height of the page 
        and handles the sticky video logic.
      */}
      <ScrollVideoContainer 
        src="https://bhpkldoualbskgfrwkmp.supabase.co/storage/v1/object/public/video/book_cover_vmake.webm" 
        scrollLength="400vh"
      >
        <HeroOverlay />
      </ScrollVideoContainer>
      
      {/* Footer / Subsequent content */}
      <footer className="relative z-20 bg-white py-12 px-6 text-center text-slate-500 border-t border-slate-200">
        <p className="mb-2 font-medium text-slate-700">Sustainable fashion through upcycling.</p>
        <p className="text-sm">© 2024 PatchPie. All rights reserved.</p>
      </footer>
    </main>
  );
};

export default App;
