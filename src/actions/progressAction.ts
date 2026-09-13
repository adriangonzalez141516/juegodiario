"use server";

export async function saveProgress() {
  // Aquí se ejecutaría la lógica para sincronizar con Supabase
  // Es una mutación "fire-and-forget" que no bloquea la UI.
  console.log("Sincronizando progreso en Supabase en segundo plano...");
  
  // Simulamos delay de red
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return { success: true };
}
