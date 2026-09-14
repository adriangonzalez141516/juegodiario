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
    <>
      {/* Schema JSON-LD para SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* 1. Contenedor enigma: ocupa EXACTAMENTE el alto que queda entre cabecera y respuesta */}
      <div className="fixed top-14 sm:top-16 bottom-[116px] sm:bottom-[132px] left-0 w-full z-20 overflow-y-auto px-3 sm:px-6 py-2.5 sm:py-3.5 flex justify-center">
        <div className="w-full max-w-2xl h-full flex flex-col">
          <Suspense fallback={<div className="animate-pulse h-full w-full bg-[var(--card)] opacity-50 rounded-sm" />}>
            <PuzzleView puzzle={puzzle} />
          </Suspense>
        </div>
      </div>

      {/* 2. Campo de respuesta: fijo justo encima del BottomBar */}
      <div className="fixed bottom-14 sm:bottom-16 left-0 w-full h-[60px] sm:h-[68px] bg-[var(--background)]/95 backdrop-blur-sm border-t border-[var(--card-border)] z-30 flex items-center justify-center px-4 shadow-[0_-2px_10px_rgba(0,0,0,0.04)]">
        <div className="w-full max-w-md">
          <InteractiveInput hashedSolution={hashedSolution} onSuccess={saveProgress} />
        </div>
      </div>
    </>
  );
}
