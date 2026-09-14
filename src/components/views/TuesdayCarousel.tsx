'use client';

import React, { useRef, useState } from 'react';

interface Testimony {
  character: string;
  statement: string;
}

interface Props {
  testimonies: Testimony[];
}

export default function TuesdayCarousel({ testimonies }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const width = scrollRef.current.clientWidth;
    const index = Math.round(scrollLeft / width);
    setActiveIndex(index);
  };

  const scrollTo = (index: number) => {
    if (!scrollRef.current) return;
    const width = scrollRef.current.clientWidth;
    scrollRef.current.scrollTo({ left: width * index, behavior: 'smooth' });
  };

  return (
    <div className="w-full">
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex md:grid md:grid-cols-3 overflow-x-auto md:overflow-visible gap-3 pb-2 snap-x snap-mandatory hide-scrollbar"
      >
        {testimonies.map((t, idx) => (
          <div 
            key={idx} 
            className="w-full min-w-full md:min-w-0 flex-shrink-0 md:flex-shrink snap-center p-3.5 sm:p-4 bg-[var(--card-inner)] rounded-sm border border-card-border text-left shadow-inner"
          >
            <h3 className="font-bold font-serif text-accent mb-1.5 text-sm sm:text-base">{t.character}</h3>
            <p className="text-foreground/90 text-sm sm:text-base leading-relaxed font-serif">"{t.statement}"</p>
          </div>
        ))}
      </div>
      
      {/* Puntos de paginación (solo en móvil) */}
      <div className="flex md:hidden justify-center gap-2 mt-2">
        {testimonies.map((_, idx) => (
          <button
            key={idx}
            onClick={() => scrollTo(idx)}
            className={`w-2 h-2 rounded-full transition-colors ${
              activeIndex === idx ? 'bg-accent' : 'bg-card-border'
            }`}
            aria-label={`Ver testimonio ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
