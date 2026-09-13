import "server-only";
import { SHA256 } from 'crypto-js';
import { normalizeAnswer } from '@/utils/helpers';

// En un entorno real, estos datos estarían en Supabase.
// Aquí simulamos la base de datos de puzles.

export type PuzzleType = 
  | 'monday_object'
  | 'tuesday_deduction'
  | 'wednesday_hieroglyph'
  | 'thursday_logic'
  | 'friday_riddle'
  | 'saturday_association'
  | 'sunday_metapuzzle';

export interface BasePuzzle {
  id: string;
  dayOfWeek: number; // 1 (Lunes) a 7 (Domingo)
  type: PuzzleType;
  title: string;
  description: string;
  hints: string[];
}

export interface MondayPuzzle extends BasePuzzle {
  type: 'monday_object';
  alienDescription: string;
}

export interface TuesdayPuzzle extends BasePuzzle {
  type: 'tuesday_deduction';
  testimonies: { character: string; statement: string }[];
}

export interface WednesdayPuzzle extends BasePuzzle {
  type: 'wednesday_hieroglyph';
  emojis: string;
}

export interface ThursdayPuzzle extends BasePuzzle {
  type: 'thursday_logic';
  rules: string[];
  slots: number;
}

export interface FridayPuzzle extends BasePuzzle {
  type: 'friday_riddle';
  riddleText: string;
}

export interface SaturdayPuzzle extends BasePuzzle {
  type: 'saturday_association';
  words: string[];
}

export interface SundayPuzzle extends BasePuzzle {
  type: 'sunday_metapuzzle';
  narrative: string;
  requiredSolutions: number;
}

export type AnyPuzzle =
  | MondayPuzzle
  | TuesdayPuzzle
  | WednesdayPuzzle
  | ThursdayPuzzle
  | FridayPuzzle
  | SaturdayPuzzle
  | SundayPuzzle;

interface PuzzleDBEntry {
  puzzle: AnyPuzzle;
  solution: string; // Esto NO se envía al cliente
}

// Simulamos los datos para una semana
const mockDatabase: PuzzleDBEntry[] = [
  {
    puzzle: {
      id: 'puz-1-mon',
      dayOfWeek: 1,
      type: 'monday_object',
      title: 'El Objeto Incomprendido',
      description: 'Un explorador del futuro describe un artefacto del siglo XXI.',
      alienDescription: 'Un monolito de cristal negro que, al tocar su superficie helada, cobra vida mostrando ventanas a otros mundos, pero se alimenta diariamente de un cordón que nace de la pared.',
      hints: ['Todos tenemos uno.', 'Sirve para comunicarse.']
    },
    solution: 'telefono' // normalizamos a minúsculas sin tildes para comparar
  },
  {
    puzzle: {
      id: 'puz-2-tue',
      dayOfWeek: 2,
      type: 'tuesday_deduction',
      title: 'Deducción de Testimonios',
      description: 'Alguien rompió el jarrón. Uno miente porque su relato contiene una contradicción física.',
      testimonies: [
        { character: 'Ana', statement: 'Yo estaba en el jardín, miré por la ventana oeste y vi cómo el sol del amanecer iluminaba el jarrón antes de caer.' },
        { character: 'Luis', statement: 'Escuché el golpe desde la cocina y vine corriendo.' },
        { character: 'Carlos', statement: 'Yo estaba leyendo en el sofá y no vi nada.' }
      ],
      hints: ['Presta atención a los puntos cardinales y la hora.', '¿Por dónde sale el sol?']
    },
    solution: 'ana'
  },
  {
    puzzle: {
      id: 'puz-3-wed',
      dayOfWeek: 3,
      type: 'wednesday_hieroglyph',
      title: 'Jeroglíficos Visuales',
      description: 'Descifra el concepto oculto tras estos símbolos.',
      emojis: '👁️ 👂 ❌ 🗣️',
      hints: ['Es un refrán o dicho popular.', 'Ver, oír...']
    },
    solution: 'ver oir y callar'
  },
  {
    puzzle: {
      id: 'puz-4-thu',
      dayOfWeek: 4,
      type: 'thursday_logic',
      title: 'Lógica de Restricciones',
      description: 'Descubre el orden correcto de las pociones en la estantería (5 posiciones).',
      rules: [
        'La poción roja no toca a la verde.',
        'La azul está en un extremo.',
        'La negra está justo a la derecha de la blanca.',
        'La verde está en la posición 3.'
      ],
      slots: 5,
      hints: ['Si la verde es la 3, y la azul un extremo...', 'La negra está a la derecha de la blanca.']
    },
    solution: 'azul' // Preguntaremos por el color de la posición 1, por ejemplo.
  },
  {
    puzzle: {
      id: 'puz-5-fri',
      dayOfWeek: 5,
      type: 'friday_riddle',
      title: 'El Enigma del Viernes',
      description: 'Resuelve esta adivinanza.',
      riddleText: 'Vuelo sin alas, lloro sin ojos. ¿Qué soy?',
      hints: ['Aparece en el cielo.']
    },
    solution: 'nube'
  },
  {
    puzzle: {
      id: 'puz-6-sat',
      dayOfWeek: 6,
      type: 'saturday_association',
      title: 'Asociación de Conceptos',
      description: '¿Qué palabra une a estos 4 conceptos?',
      words: ['Ratón', 'Teclado', 'Pantalla', 'Placa base'],
      hints: ['Es un dispositivo.']
    },
    solution: 'ordenador'
  },
  {
    puzzle: {
      id: 'puz-7-sun',
      dayOfWeek: 7,
      type: 'sunday_metapuzzle',
      title: 'El Rompecabezas Narrativo',
      description: 'Combina las soluciones de esta semana. La clave para salir es el dispositivo con el que empezó todo, usado por la mentirosa para avisar sobre el clima.',
      narrative: 'La puerta solo se abrirá si introduces la contraseña final que relaciona: [Lunes], [Martes] y [Viernes].',
      requiredSolutions: 6,
      hints: ['Busca la solución del Lunes.', 'Combina las palabras clave.']
    },
    solution: 'telefono ana nube'
  }
];

export interface DailyPuzzlePayload {
  puzzle: AnyPuzzle;
  hashedSolution: string; // Hash SHA256 de la solución para validación en cliente
}

// Función auxiliar movida a @/utils/helpers

// Función para obtener el puzle del día
export async function getDailyPuzzle(dayOffset: number = 0): Promise<DailyPuzzlePayload> {
  // Simulamos un pequeño delay de BBDD
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const today = new Date();
  let currentDay = today.getDay(); // 0 = Domingo, 1 = Lunes, etc.
  
  // Ajuste para que Lunes = 1, ..., Domingo = 7
  if (currentDay === 0) currentDay = 7;
  
  // Aplicar offset para debugging
  let targetDay = currentDay + dayOffset;
  while (targetDay < 1) targetDay += 7;
  while (targetDay > 7) targetDay -= 7;

  const entry = mockDatabase.find(e => e.puzzle.dayOfWeek === targetDay);
  
  if (!entry) {
    throw new Error('Puzzle not found for today');
  }

  // Generamos el hash en el servidor. 
  // En producción, esto podría estar pre-calculado en la BBDD.
  const normalizedSolution = normalizeAnswer(entry.solution);
  const hashedSolution = SHA256(normalizedSolution).toString();

  return {
    puzzle: entry.puzzle,
    hashedSolution
  };
}
