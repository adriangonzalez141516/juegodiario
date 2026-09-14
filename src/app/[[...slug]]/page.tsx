import { getDailyPuzzle } from '@/services/puzzleService';
import PuzzleView from '@/components/views/PuzzleView';
import InteractiveInput from '@/components/InteractiveInput';
import { Suspense } from 'react';
import { Metadata } from 'next';
import { saveProgress } from '@/actions/progressAction';

export const revalidate = 3600; // ISR 1 hora

type Props = {
  params: Promise<{ slug?: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const isArchive = slug && slug[0] === 'archive';
  const isTest = slug && slug[0] === 'test';

  if (isArchive) {
    return {
      title: "Archivo - El Enigma Diario",
      description: "Explora los enigmas pasados.",
    };
  }

  let forceDay: number | undefined;
  if (isTest && slug[1]) {
    forceDay = parseInt(slug[1]);
  }

  const { puzzle } = await getDailyPuzzle(0, forceDay);

  return {
    title: `${puzzle.title} | El Enigma Diario`,
    description: puzzle.description,
    alternates: {
      canonical: `https://elenigmadiario.com`,
    }
  };
}

export default async function OrchestratorPage({ params }: Props) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  // Ruteo básico por slug
  if (slug && slug[0] === 'archive') {
    return (
      <div className="w-full flex flex-col items-center">
        <h2 className="text-2xl font-serif font-bold mb-4 text-[#d4af37]">Archivo de Puzles</h2>
        <p className="text-slate-400">Próximamente...</p>
      </div>
    );
  }

  let forceDay: number | undefined;
  if (slug && slug[0] === 'test' && slug[1]) {
    forceDay = parseInt(slug[1]);
  }

  const { puzzle, hashedSolution } = await getDailyPuzzle(0, forceDay);

  // Schema JSON-LD para SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Game',
    name: puzzle.title,
    description: puzzle.description,
    genre: 'Puzzle',
  };

  return (
    <div className="flex-1 w-full flex flex-col min-h-0 overflow-hidden">
      {/* Schema JSON-LD para SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* 1. Contenedor enigma: ocupa TODO el alto restante con scroll vertical aislado */}
      <div className="flex-1 w-full min-h-0 overflow-y-auto px-3 sm:px-6 py-2 sm:py-4 flex flex-col">
        <div className="my-auto w-full flex flex-col items-center">
          <Suspense fallback={<div className="animate-pulse h-48 w-full bg-[var(--card)] opacity-50 rounded-sm" />}>
            <PuzzleView puzzle={puzzle} />
          </Suspense>
        </div>
      </div>

      {/* 2. Campo de respuesta: fijo justo encima del BottomBar */}
      <div className="shrink-0 w-full px-4 py-2.5 sm:py-3 bg-[var(--background)] border-t border-[var(--card-border)] z-20 flex justify-center shadow-sm">
        <div className="w-full max-w-md">
          <InteractiveInput hashedSolution={hashedSolution} onSuccess={saveProgress} />
        </div>
      </div>
    </div>
  );
}
