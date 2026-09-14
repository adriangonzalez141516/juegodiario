import { AnyPuzzle } from '@/services/puzzleService';
import React from 'react';
import TuesdayCarousel from './TuesdayCarousel';

interface PuzzleViewProps {
  puzzle: AnyPuzzle;
}

export default function PuzzleView({ puzzle }: PuzzleViewProps) {
  return (
    <div className="w-full max-w-2xl antique-panel p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center text-center">
      <div className="mb-2 sm:mb-3 text-accent font-semibold tracking-widest uppercase text-xs md:text-sm">
        Día {puzzle.dayOfWeek} • {puzzle.title}
      </div>
      <p className="text-foreground text-sm sm:text-base md:text-lg mb-3 sm:mb-5 max-w-xl font-serif leading-relaxed">
        {puzzle.description}
      </p>

      {/* Renderizado específico por tipo de puzle */}
      <div className="w-full max-w-lg mx-auto">
        {puzzle.type === 'monday_object' && (
          <div className="p-3.5 sm:p-5 bg-[var(--card-inner)] rounded-sm border border-card-border shadow-inner">
            <p className="text-base sm:text-lg md:text-xl italic font-serif text-foreground">
              "{puzzle.alienDescription}"
            </p>
          </div>
        )}

        {puzzle.type === 'tuesday_deduction' && (
          <TuesdayCarousel testimonies={puzzle.testimonies} />
        )}

        {puzzle.type === 'wednesday_hieroglyph' && (
          <div className="p-4 sm:p-6 text-3xl sm:text-4xl md:text-5xl tracking-widest bg-[var(--card-inner)] rounded-sm border border-card-border shadow-inner">
            {puzzle.emojis}
          </div>
        )}

        {puzzle.type === 'thursday_logic' && (
          <div className="flex flex-col items-center">
            <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-3">
              {Array.from({ length: puzzle.slots }).map((_, i) => (
                <div key={i} className="w-9 h-12 sm:w-10 sm:h-14 md:w-14 md:h-16 border-2 border-dashed border-card-border rounded-sm flex items-center justify-center text-card-border font-bold font-serif text-sm sm:text-base">
                  {i + 1}
                </div>
              ))}
            </div>
            <ul className="text-left space-y-1 text-foreground/90 font-serif text-xs sm:text-sm md:text-base">
              {puzzle.rules.map((rule, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-accent mr-2">•</span> <span className="leading-tight">{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {puzzle.type === 'friday_riddle' && (
          <div className="p-4 sm:p-6 bg-[var(--card-inner)] rounded-sm border border-card-border shadow-inner">
            <h2 className="text-lg sm:text-xl md:text-2xl font-serif text-foreground italic">
              "{puzzle.riddleText}"
            </h2>
          </div>
        )}

        {puzzle.type === 'saturday_association' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 max-w-sm mx-auto">
            {puzzle.words.map((word, idx) => (
              <div key={idx} className="p-2.5 sm:p-3 bg-[var(--card-inner)] rounded-sm border border-card-border shadow-inner flex items-center justify-center font-serif text-foreground text-xs sm:text-sm md:text-base">
                {word}
              </div>
            ))}
          </div>
        )}

        {puzzle.type === 'sunday_metapuzzle' && (
          <div className="p-3.5 sm:p-5 bg-[var(--card-inner)] rounded-sm border border-card-border shadow-inner">
            <p className="text-sm sm:text-base md:text-lg text-accent font-serif font-medium mb-2 sm:mb-3">
              {puzzle.narrative}
            </p>
            <div className="text-xs sm:text-sm text-foreground/80 font-serif">
              Has resuelto <span className="text-foreground font-bold">?</span> de {puzzle.requiredSolutions} puzles necesarios.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
