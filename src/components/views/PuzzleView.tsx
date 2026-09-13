import { AnyPuzzle } from '@/services/puzzleService';
import React from 'react';

interface PuzzleViewProps {
  puzzle: AnyPuzzle;
}

export default function PuzzleView({ puzzle }: PuzzleViewProps) {
  return (
    <div className="w-full antique-panel p-8 md:p-12 mt-8 flex flex-col items-center justify-center text-center">
      <div className="mb-4 text-[#d4af37] font-semibold tracking-widest uppercase text-sm">
        Día {puzzle.dayOfWeek} • {puzzle.title}
      </div>
      <p className="text-[#f4ecd8]/80 text-lg mb-8 max-w-2xl font-serif">
        {puzzle.description}
      </p>

      {/* Renderizado específico por tipo de puzle */}
      <div className="w-full">
        {puzzle.type === 'monday_object' && (
          <div className="p-6 bg-[#1a1410]/50 rounded-sm border border-[#4a3c2b] shadow-inner">
            <p className="text-xl italic font-serif text-[#f4ecd8]">
              "{puzzle.alienDescription}"
            </p>
          </div>
        )}

        {puzzle.type === 'tuesday_deduction' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {puzzle.testimonies.map((t, idx) => (
              <div key={idx} className="p-4 bg-[#1a1410]/50 rounded-sm border border-[#4a3c2b] text-left shadow-inner">
                <h3 className="font-bold font-serif text-[#d4af37] mb-2">{t.character}</h3>
                <p className="text-[#f4ecd8]/70 text-sm">"{t.statement}"</p>
              </div>
            ))}
          </div>
        )}

        {puzzle.type === 'wednesday_hieroglyph' && (
          <div className="p-8 text-5xl tracking-widest bg-[#1a1410]/50 rounded-sm border border-[#4a3c2b] shadow-inner">
            {puzzle.emojis}
          </div>
        )}

        {puzzle.type === 'thursday_logic' && (
          <div className="flex flex-col items-center">
            <div className="flex gap-2 md:gap-4 mb-6">
              {Array.from({ length: puzzle.slots }).map((_, i) => (
                <div key={i} className="w-12 h-16 md:w-16 md:h-20 border-2 border-dashed border-[#4a3c2b] rounded-sm flex items-center justify-center text-[#4a3c2b] font-bold font-serif">
                  {i + 1}
                </div>
              ))}
            </div>
            <ul className="text-left space-y-2 text-[#f4ecd8]/80 font-serif">
              {puzzle.rules.map((rule, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-[#d4af37] mr-2">•</span> {rule}
                </li>
              ))}
            </ul>
          </div>
        )}

        {puzzle.type === 'friday_riddle' && (
          <div className="p-8 bg-[#1a1410]/50 rounded-sm border border-[#4a3c2b] shadow-inner">
            <h2 className="text-2xl font-serif text-[#f4ecd8] italic">
              "{puzzle.riddleText}"
            </h2>
          </div>
        )}

        {puzzle.type === 'saturday_association' && (
          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
            {puzzle.words.map((word, idx) => (
              <div key={idx} className="p-4 bg-[#1a1410]/50 rounded-sm border border-[#4a3c2b] shadow-inner flex items-center justify-center font-serif text-[#f4ecd8]">
                {word}
              </div>
            ))}
          </div>
        )}

        {puzzle.type === 'sunday_metapuzzle' && (
          <div className="p-6 bg-[#1a1410]/50 rounded-sm border border-[#4a3c2b] shadow-inner">
            <p className="text-lg text-[#d4af37] font-serif font-medium mb-4">
              {puzzle.narrative}
            </p>
            <div className="text-sm text-[#f4ecd8]/60 font-serif">
              Has resuelto <span className="text-[#f4ecd8] font-bold">?</span> de {puzzle.requiredSolutions} puzles necesarios.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
