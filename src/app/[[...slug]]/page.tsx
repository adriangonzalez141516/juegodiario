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
    <div className="w-full min-h-full flex flex-col items-center px-4">
      {/* Schema JSON-LD para SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="w-full my-auto shrink-0 pt-4">
        <Suspense fallback={<div className="animate-pulse h-[60vh] w-full bg-[var(--card)] opacity-50 rounded-sm"></div>}>
          <PuzzleView puzzle={puzzle} />
        </Suspense>
      </div>

      {/* Spacer inquebrantable para evitar colisión con el input fijo y bottom bar */}
      <div className="w-full shrink-0 h-40"></div>

      <div className="fixed bottom-16 left-0 w-full p-4 bg-[var(--background)] border-t border-[var(--card-border)] z-40 flex justify-center">
        <div className="w-full max-w-md">
          <InteractiveInput hashedSolution={hashedSolution} onSuccess={saveProgress} />
        </div>
      </div>
    </div>
  );
}
