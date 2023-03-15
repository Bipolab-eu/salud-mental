'use client';

import dynamic from 'next/dynamic';
import { useAppContext } from '@/context/store';

const Map = dynamic(() => import('../../components/Mapa'), { ssr: false });

export default function Mapa() {
  const { mapaData } = useAppContext();

  return (
    <main className="h-screen">
      {mapaData && mapaData.length && <Map {...mapaData} />}
    </main>
  );
}
