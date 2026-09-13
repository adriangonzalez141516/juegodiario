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
          className={`w-full px-6 py-4 rounded-xl bg-slate-800/50 border backdrop-blur-sm text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
            error ? 'border-red-500 ring-2 ring-red-500 animate-pulse' : 
            success ? 'border-green-500 ring-2 ring-green-500' : 'border-slate-700'
          }`}
        />
        <button
          type="submit"
          disabled={success || !input.trim()}
          className={`absolute right-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            success ? 'bg-green-600 text-white' : 'bg-blue-600 hover:bg-blue-500 text-white disabled:bg-slate-700 disabled:text-slate-400'
          }`}
        >
          {success ? 'Correcto' : 'Comprobar'}
        </button>
      </div>
      {error && (
        <p className="text-red-400 text-sm mt-2 text-center animate-bounce">
          Respuesta incorrecta. Inténtalo de nuevo.
        </p>
      )}
    </form>
  );
}
