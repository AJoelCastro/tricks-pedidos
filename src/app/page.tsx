import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Tricks Pedidos</h1>
          </div>
          <div>
            <SignedIn>
              <div className="flex items-center gap-4">
                <Link href="/pedidos" className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors shadow-md hover:shadow-lg">
                  Pedidos
                </Link>
                <UserButton />
              </div>
            </SignedIn>
            <SignedOut>
              <SignInButton>
                <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium transition-all shadow-md hover:shadow-lg">
                  Iniciar sesión
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Hero text */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                Gestiona tus <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">pedidos</span> fácilmente
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed">
                Organiza, edita y elimina tus pedidos con una interfaz moderna y segura. Acceso rápido, eficiente y protegido.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <SignedIn>
                <Link href="/pedidos" className="px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors shadow-lg hover:shadow-xl">
                  Ir a Pedidos
                </Link>
              </SignedIn>
              <SignedOut>
                <SignInButton>
                  <button className="px-8 py-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold transition-all shadow-lg hover:shadow-xl">
                    Comenzar
                  </button>
                </SignInButton>
              </SignedOut>
            </div>
          </div>

          {/* Right side - Feature cards */}
          <div className="grid grid-cols-1 gap-4">
            <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-100">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Fácil de usar</h3>
              <p className="text-slate-600">Interfaz intuitiva para gestionar pedidos sin complicaciones.</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-100">
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Seguro</h3>
              <p className="text-slate-600">Autenticación con Clerk para proteger tus datos.</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-100">
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Rápido</h3>
              <p className="text-slate-600">Conexión optimizada con caché de base de datos.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white/50 backdrop-blur-sm mt-20">
        <div className="mx-auto max-w-7xl px-6 py-8 text-center text-slate-600">
          <p>© 2025 Tricks Pedidos. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
