"use client";

import { useState } from 'react';
import { SHA256 } from 'crypto-js';
import { normalizeAnswer } from '@/utils/helpers';

interface InteractiveInputProps {
  hashedSolution: string;
  onSuccess: () => void;
}

export default function InteractiveInput({ hashedSolution, onSuccess }: InteractiveInputProps) {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Normalizar la entrada y generar el hash localmente
    const normalized = normalizeAnswer(input);
    const hash = SHA256(normalized).toString();

    if (hash === hashedSolution) {
      setSuccess(true);
      setError(false);
      onSuccess();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000); // Reset de error para animación
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mt-8">
      <div className="relative flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={success}
          placeholder="Escribe tu respuesta aquí..."
          className={`w-full px-6 py-4 rounded-sm bg-[#1a1410]/80 border shadow-inner text-[#f4ecd8] placeholder:text-[#f4ecd8]/40 focus:outline-none focus:ring-1 focus:ring-[#d4af37] transition-all font-serif ${
            error ? 'border-red-900 ring-1 ring-red-900 animate-pulse' : 
            success ? 'border-green-900 ring-1 ring-green-900' : 'border-[#4a3c2b]'
          }`}
        />
        <button
          type="submit"
          disabled={success || !input.trim()}
          className={`absolute right-2 px-4 py-2 rounded-sm font-medium transition-colors font-serif ${
            success ? 'bg-green-900 text-[#f4ecd8]' : 'bg-[#4a3c2b] hover:bg-[#d4af37] text-[#f4ecd8] hover:text-[#1a1410] disabled:bg-[#2a2118] disabled:text-[#f4ecd8]/30'
          }`}
        >
          {success ? 'Correcto' : 'Comprobar'}
        </button>
      </div>
      {error && (
        <p className="text-red-400 text-sm mt-2 text-center animate-bounce font-serif italic">
          Respuesta incorrecta. Inténtalo de nuevo.
        </p>
      )}
    </form>
  );
}
