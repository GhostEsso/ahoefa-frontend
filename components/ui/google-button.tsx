"use client";

import { signIn } from "next-auth/react";
import { Button } from "./button";
import { FcGoogle } from "react-icons/fc";

export function GoogleButton() {
  return (
    <Button
      variant="outline"
      className="w-full flex items-center justify-center gap-2"
      onClick={() => signIn("google", { callbackUrl: "/" })}
    >
      <FcGoogle className="w-5 h-5" />
      Continuer avec Google
    </Button>
  );
} 