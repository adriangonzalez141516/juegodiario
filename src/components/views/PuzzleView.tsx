import { AnyPuzzle } from '@/services/puzzleService';
import React from 'react';

interface PuzzleViewProps {
  puzzle: AnyPuzzle;
}

export default function PuzzleView({ puzzle }: PuzzleViewProps) {
  return (
    <div className="w-full h-full min-h-full antique-panel p-2 md:p-6 flex flex-col items-center justify-center text-center">
      <div className="mb-4 text-accent font-semibold tracking-widest uppercase text-xs md:text-sm">
        Día {puzzle.dayOfWeek} • {puzzle.title}
      </div>
      <p className="text-foreground text-base md:text-lg mb-6 max-w-2xl font-serif leading-relaxed">
        {puzzle.description}
      </p>

      {/* Renderizado específico por tipo de puzle */}
      <div className="w-full max-w-lg mx-auto">
        {puzzle.type === 'monday_object' && (
          <div className="p-5 bg-[var(--card-inner)] rounded-sm border border-card-border shadow-inner">
            <p className="text-lg md:text-xl italic font-serif text-foreground">
              "{puzzle.alienDescription}"
            </p>
          </div>
        )}

        {puzzle.type === 'tuesday_deduction' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {puzzle.testimonies.map((t, idx) => (
              <div key={idx} className="p-3 bg-[var(--card-inner)] rounded-sm border border-card-border text-left shadow-inner">
                <h3 className="font-bold font-serif text-accent mb-1 text-sm">{t.character}</h3>
                <p className="text-foreground/90 text-sm leading-snug">"{t.statement}"</p>
              </div>
            ))}
          </div>
        )}

        {puzzle.type === 'wednesday_hieroglyph' && (
          <div className="p-6 text-4xl md:text-5xl tracking-widest bg-[var(--card-inner)] rounded-sm border border-card-border shadow-inner">
            {puzzle.emojis}
          </div>
        )}

        {puzzle.type === 'thursday_logic' && (
          <div className="flex flex-col items-center">
            <div className="flex gap-2 md:gap-3 mb-4">
              {Array.from({ length: puzzle.slots }).map((_, i) => (
                <div key={i} className="w-10 h-14 md:w-14 md:h-16 border-2 border-dashed border-card-border rounded-sm flex items-center justify-center text-card-border font-bold font-serif">
                  {i + 1}
                </div>
              ))}
            </div>
            <ul className="text-left space-y-1 text-foreground/90 font-serif text-sm md:text-base">
              {puzzle.rules.map((rule, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-accent mr-2">•</span> <span className="leading-tight">{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {puzzle.type === 'friday_riddle' && (
          <div className="p-6 bg-[var(--card-inner)] rounded-sm border border-card-border shadow-inner">
            <h2 className="text-xl md:text-2xl font-serif text-foreground italic">
              "{puzzle.riddleText}"
            </h2>
          </div>
        )}

        {puzzle.type === 'saturday_association' && (
          <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
            {puzzle.words.map((word, idx) => (
              <div key={idx} className="p-3 bg-[var(--card-inner)] rounded-sm border border-card-border shadow-inner flex items-center justify-center font-serif text-foreground text-sm md:text-base">
                {word}
              </div>
            ))}
          </div>
        )}

        {puzzle.type === 'sunday_metapuzzle' && (
          <div className="p-5 bg-[var(--card-inner)] rounded-sm border border-card-border shadow-inner">
            <p className="text-base md:text-lg text-accent font-serif font-medium mb-3">
              {puzzle.narrative}
            </p>
            <div className="text-sm text-foreground/80 font-serif">
              Has resuelto <span className="text-foreground font-bold">?</span> de {puzzle.requiredSolutions} puzles necesarios.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
