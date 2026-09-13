---
trigger: always_on
---

1. Renderizado y Caché (Velocidad Extrema)

Default a Server Components: El page.tsx del "Director de Orquesta" y todos los componentes de lectura de datos deben renderizarse en el servidor.

Generación Estática (ISR): El contenido del puzle diario se debe obtener mediante fetch a Supabase (o a una API interna) utilizando next: { revalidate: 3600 } o revalidación bajo demanda (revalidateTag). El usuario final debe recibir HTML estático. Cero llamadas a base de datos en el cliente durante la carga inicial.

Streaming y Suspense: Envolver cualquier componente que dependa de datos no cacheados (como el bloque de estadísticas del usuario) en <Suspense> para no bloquear el First Paint de la interfaz del puzle.

2. Aislamiento de Client Components (Performance Frontend)

Nodos hoja: La directiva 'use client' está estrictamente reservada para los componentes interactivos en la parte más baja del árbol: el <input> de respuesta, botones de pistas, el temporizador y modales.

Sin estados globales pesados: Evitar Redux o Context API globales envolviendo toda la app. Usar Zustand para estados locales complejos o localStorage nativo.

3. Optimización SEO (Descubribilidad y Compartición)

Metadatos Dinámicos: Utilizar generateMetadata() en [[...slug]]/page.tsx. Cada día o ruta debe generar su propio <title>, <meta description> y etiquetas Open Graph precisas (ej. "Reto de Lógica #14").

Canonical URLs: Inyectar siempre la URL canónica absoluta para evitar que el contenido duplicado penalice el ranking.

Rastreo: Configurar un sitemap.xml dinámico y un robots.txt que indexe / y el archivo público, bloqueando explícitamente /api/ y las rutas de (auth).

4. Interacciones de Latencia Cero (UX y Estado)

Validación Local: La solución del puzle debe pasarse al cliente ofuscada o hasheada. Cuando el usuario hace submit, la validación se hace localmente (0ms de latencia).

Sincronización Optimista: Guardar el resultado en localStorage instantáneamente. La actualización en Supabase (tabla user_progress) debe ejecutarse en segundo plano mediante un Server Action fire-and-forget. Nunca bloquear la UI esperando la confirmación de la base de datos.

5. Core Web Vitals (CLS y LCP)

Fuentes locales: Usar exclusivamente next/font/google para evitar saltos de layout (FOIT/FOUT).

Imágenes estables: Si se generan imágenes, usar <Image> de Next.js con width, height y priority={true} (si están above the fold) para asegurar un CLS de 0 absoluto.