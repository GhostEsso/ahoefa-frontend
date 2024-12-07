"use client";

import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('@/components/navbar').then(mod => mod.Navbar), {
  ssr: false
});

const Footer = dynamic(() => import('@/components/footer').then(mod => mod.Footer), {
  ssr: false
});

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
} 