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
    <div className="w-full flex flex-col items-center">
      {/* Inyección JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <Suspense fallback={<div className="animate-pulse h-64 w-full bg-[var(--card)] opacity-50 rounded-sm"></div>}>
        <PuzzleView puzzle={puzzle} />
      </Suspense>

      <div className="mt-6 text-center w-full max-w-md">
        <h3 className="text-sm font-medium text-slate-400 mb-2 uppercase tracking-wide">
          Introduce tu respuesta
        </h3>
        {/* Aquí pasamos la Server Action a ejecutar asíncronamente */}
        <InteractiveInput 
          hashedSolution={hashedSolution} 
          onSuccess={saveProgress} 
        />
      </div>
    </div>
  );
}
