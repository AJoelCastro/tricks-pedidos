import Image from "next/image";
import Link from "next/link";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans bg-white">
      <main className="flex min-h-screen w-full  flex-col items-center justify-between py-32 px-16 sm:items-start">
        <div className="absolute top-6 right-6">
          <SignedIn>
            <div className="flex items-center gap-2">
              <UserButton />
              <Link href="/pedidos" className="px-4 py-2 rounded bg-blue-600 text-black">Pedidos</Link>
            </div>
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <button className="px-4 py-2 rounded bg-green-600 text-black">Iniciar sesión</button>
            </SignInButton>
          </SignedOut>
        </div>
      </main>
    </div>
  );
}
