import { AnyPuzzle } from '@/services/puzzleService';
import React from 'react';

interface PuzzleViewProps {
  puzzle: AnyPuzzle;
}

export default function PuzzleView({ puzzle }: PuzzleViewProps) {
  return (
    <div className="w-full glass-panel p-8 md:p-12 mt-8 flex flex-col items-center justify-center text-center">
      <div className="mb-4 text-emerald-400 font-semibold tracking-widest uppercase text-sm">
        Día {puzzle.dayOfWeek} • {puzzle.title}
      </div>
      <p className="text-slate-300 text-lg mb-8 max-w-2xl">
        {puzzle.description}
      </p>

      {/* Renderizado específico por tipo de puzle */}
      <div className="w-full">
        {puzzle.type === 'monday_object' && (
          <div className="p-6 bg-slate-900/50 rounded-xl border border-slate-700">
            <p className="text-xl italic font-serif text-slate-100">
              "{puzzle.alienDescription}"
            </p>
          </div>
        )}

        {puzzle.type === 'tuesday_deduction' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {puzzle.testimonies.map((t, idx) => (
              <div key={idx} className="p-4 bg-slate-900/50 rounded-xl border border-slate-700 text-left">
                <h3 className="font-bold text-blue-400 mb-2">{t.character}</h3>
                <p className="text-slate-300 text-sm">"{t.statement}"</p>
              </div>
            ))}
          </div>
        )}

        {puzzle.type === 'wednesday_hieroglyph' && (
          <div className="p-8 text-5xl tracking-widest bg-slate-900/50 rounded-xl border border-slate-700">
            {puzzle.emojis}
          </div>
        )}

        {puzzle.type === 'thursday_logic' && (
          <div className="flex flex-col items-center">
            <div className="flex gap-2 md:gap-4 mb-6">
              {Array.from({ length: puzzle.slots }).map((_, i) => (
                <div key={i} className="w-12 h-16 md:w-16 md:h-20 border-2 border-dashed border-slate-600 rounded-lg flex items-center justify-center text-slate-500 font-bold">
                  {i + 1}
                </div>
              ))}
            </div>
            <ul className="text-left space-y-2 text-slate-300">
              {puzzle.rules.map((rule, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span> {rule}
                </li>
              ))}
            </ul>
          </div>
        )}

        {puzzle.type === 'friday_riddle' && (
          <div className="p-8 bg-slate-900/50 rounded-xl border border-slate-700">
            <h2 className="text-2xl font-serif text-slate-100">
              {puzzle.riddleText}
            </h2>
          </div>
        )}

        {puzzle.type === 'saturday_association' && (
          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
            {puzzle.words.map((word, idx) => (
              <div key={idx} className="p-4 bg-slate-900/50 rounded-xl border border-slate-700 flex items-center justify-center font-semibold text-slate-200">
                {word}
              </div>
            ))}
          </div>
        )}

        {puzzle.type === 'sunday_metapuzzle' && (
          <div className="p-6 bg-slate-900/50 rounded-xl border border-slate-700">
            <p className="text-lg text-amber-300 font-medium mb-4">
              {puzzle.narrative}
            </p>
            <div className="text-sm text-slate-400">
              Has resuelto <span className="text-slate-200 font-bold">?</span> de {puzzle.requiredSolutions} puzles necesarios.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
