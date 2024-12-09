"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface ProtectedLinkProps {
  href: string;
  children: React.ReactNode;
}

export function ProtectedLink({ href, children }: ProtectedLinkProps) {
  const { status } = useSession();
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    if (status !== 'authenticated') {
      e.preventDefault();
      router.push('/login');
    }
  };

  return (
    <Link href={href} onClick={handleClick}>
      {children}
    </Link>
  );
} 