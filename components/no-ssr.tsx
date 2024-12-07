"use client";

import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

const NoSSRWrapper = ({ children }: { children: ReactNode }) => (
  <>{children}</>
);

export const NoSSR = dynamic(() => Promise.resolve(NoSSRWrapper), {
  ssr: false
}); 