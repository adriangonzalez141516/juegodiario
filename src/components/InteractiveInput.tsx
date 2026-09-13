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
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="relative flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={success}
          placeholder="Escribe tu respuesta aquí..."
          className={`w-full px-5 py-3 rounded-sm bg-black/30 border shadow-inner text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-1 focus:ring-accent transition-all font-serif ${
            error ? 'border-red-900 ring-1 ring-red-900 animate-pulse' : 
            success ? 'border-green-900 ring-1 ring-green-900' : 'border-card-border'
          }`}
        />
        <button
          type="submit"
          disabled={success || !input.trim()}
          className={`absolute right-1 px-3 py-1.5 rounded-sm font-medium transition-colors font-serif text-sm ${
            success ? 'bg-green-900 text-foreground' : 'bg-card border border-card-border hover:bg-accent text-foreground hover:text-black disabled:opacity-50 disabled:hover:bg-card disabled:hover:text-foreground'
          }`}
        >
          {success ? 'Correcto' : 'Comprobar'}
        </button>
      </div>
      {error && (
        <p className="text-red-400 text-xs mt-2 text-center animate-bounce font-serif italic">
          Respuesta incorrecta. Inténtalo de nuevo.
        </p>
      )}
    </form>
  );
}
