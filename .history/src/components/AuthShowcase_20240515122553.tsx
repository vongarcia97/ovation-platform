// 'use client'

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AuthShowcase() {
  const router = useRouter();
  const { data: sessionData } = useSession();

  if (!sessionData) {
    router.push("/auth/sign-in");
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl">
        {sessionData && <span>Logged in as {sessionData.user?.email}</span>}
      </p>
      <button
        className="rounded-full px-10 py-3 font-semibold no-underline transition"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}
