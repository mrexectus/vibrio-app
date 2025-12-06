import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex flex-col items-center cursor-pointer select-none group">
      <div className="relative">
        <h1 className="text-3xl font-serif font-bold text-chic-deep tracking-[0.15em] group-hover:tracking-[0.2em] transition-all duration-700">VIBRIO</h1>
        <span className="absolute -top-1 -right-2 text-[8px] text-chic-primary">TM</span>
      </div>
      <div className="h-[1px] w-0 group-hover:w-full bg-gradient-to-r from-transparent via-chic-primary to-transparent mt-1 transition-all duration-700"></div>
      <span className="text-[8px] font-sans font-medium text-chic-accent tracking-[0.3em] uppercase mt-1 opacity-80">
        Soul Analytics
      </span>
    </div>
  );
};
export default Logo;