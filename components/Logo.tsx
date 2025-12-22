import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex flex-col items-center group">
      <div className="relative">
        <h1 className="text-2xl font-serif font-bold text-chic-deep tracking-[0.2em] transition-all duration-500 group-hover:tracking-[0.25em]">VIBRIO</h1>
        <div className="absolute -bottom-1 left-0 w-0 h-[1px] bg-chic-primary transition-all duration-700 group-hover:w-full"></div>
      </div>
      <span className="text-[7px] font-sans font-bold text-chic-accent tracking-[0.4em] uppercase mt-1.5 opacity-60">Soul Analytics</span>
    </div>
  );
};
export default Logo;