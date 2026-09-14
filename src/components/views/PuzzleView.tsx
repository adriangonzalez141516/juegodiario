import { AnyPuzzle } from '@/services/puzzleService';
import React from 'react';
import TuesdayCarousel from './TuesdayCarousel';

interface PuzzleViewProps {
  puzzle: AnyPuzzle;
}

export default function PuzzleView({ puzzle }: PuzzleViewProps) {
  return (
    <div className="w-full h-full min-h-full antique-panel p-4 sm:p-6 md:p-8 flex flex-col justify-between items-center text-center overflow-y-auto hide-scrollbar">
      {/* Parte superior: Título y descripción */}
      <div className="w-full shrink-0">
        <div className="mb-2 text-accent font-semibold tracking-widest uppercase text-xs sm:text-sm">
          Día {puzzle.dayOfWeek} • {puzzle.title}
        </div>
        <p className="text-foreground text-base sm:text-lg max-w-xl mx-auto font-serif leading-relaxed">
          {puzzle.description}
        </p>
      </div>

      {/* Parte central: Renderizado específico del puzle */}
      <div className="w-full max-w-lg mx-auto my-auto py-2">
        {puzzle.type === 'monday_object' && (
          <div className="p-4 sm:p-6 bg-[var(--card-inner)] rounded-sm border border-card-border shadow-inner">
            <p className="text-lg sm:text-xl italic font-serif text-foreground leading-relaxed">
              "{puzzle.alienDescription}"
            </p>
          </div>
        )}

        {puzzle.type === 'tuesday_deduction' && (
          <TuesdayCarousel testimonies={puzzle.testimonies} />
        )}

        {puzzle.type === 'wednesday_hieroglyph' && (
          <div className="p-4 sm:p-6 text-4xl sm:text-5xl md:text-6xl tracking-widest bg-[var(--card-inner)] rounded-sm border border-card-border shadow-inner">
            {puzzle.emojis}
          </div>
        )}

        {puzzle.type === 'thursday_logic' && (
          <div className="flex flex-col items-center">
            <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-4">
              {Array.from({ length: puzzle.slots }).map((_, i) => (
                <div key={i} className="w-10 h-14 sm:w-12 sm:h-16 border-2 border-dashed border-card-border rounded-sm flex items-center justify-center text-card-border font-bold font-serif text-base sm:text-lg">
                  {i + 1}
                </div>
              ))}
            </div>
            <ul className="text-left space-y-1.5 text-foreground/90 font-serif text-sm sm:text-base">
              {puzzle.rules.map((rule, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-accent mr-2">•</span> <span className="leading-snug">{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {puzzle.type === 'friday_riddle' && (
          <div className="p-4 sm:p-6 bg-[var(--card-inner)] rounded-sm border border-card-border shadow-inner">
            <h2 className="text-xl sm:text-2xl font-serif text-foreground italic leading-relaxed">
              "{puzzle.riddleText}"
            </h2>
          </div>
        )}

        {puzzle.type === 'saturday_association' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 max-w-sm mx-auto">
            {puzzle.words.map((word, idx) => (
              <div key={idx} className="p-3 bg-[var(--card-inner)] rounded-sm border border-card-border shadow-inner flex items-center justify-center font-serif text-foreground text-sm sm:text-base font-medium">
                {word}
              </div>
            ))}
          </div>
        )}

        {puzzle.type === 'sunday_metapuzzle' && (
          <div className="p-4 sm:p-6 bg-[var(--card-inner)] rounded-sm border border-card-border shadow-inner">
            <p className="text-base sm:text-lg text-accent font-serif font-medium mb-3 leading-relaxed">
              {puzzle.narrative}
            </p>
            <div className="text-sm sm:text-base text-foreground/80 font-serif">
              Has resuelto <span className="text-foreground font-bold">?</span> de {puzzle.requiredSolutions} puzles necesarios.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
