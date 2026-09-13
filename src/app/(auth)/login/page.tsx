export default function LoginPage() {
  return (
    <div className="w-full flex flex-col items-center justify-center mt-12">
      <div className="glass-panel p-8 w-full max-w-sm text-center">
        <h2 className="text-2xl font-bold mb-6 text-slate-100">Iniciar Sesión</h2>
        <p className="text-slate-400 mb-6">
          Guarda tu progreso diario en Supabase.
        </p>
        <button className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 font-medium py-3 px-4 rounded-lg transition-colors">
          Continuar con Google
        </button>
      </div>
    </div>
  );
}
