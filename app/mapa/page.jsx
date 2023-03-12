'use client';

import dynamic from 'next/dynamic';

const Map = dynamic(() => import('../../components/Map'), { ssr: false });

const data = [
  {
    center: 'IES Siete Palmas',
    position: [28.120316, -15.518784],
    value: 70,
    status: 'Bueno',
  },
  {
    center: 'IES Alonso Quesada',
    position: [28.10315, -15.44209],
    value: 50,
    status: 'Malo',
  },
  {
    center: 'IES El Batán',
    position: [28.09131, -15.43302],
    value: 60,
    status: 'Malo',
  },
  {
    center: 'IES El Rincón',
    position: [28.12778, -15.44663],
    value: 80,
    status: 'Malo',
  },
  {
    center: 'IES Cairasco de Figueroa',
    position: [28.10115, -15.47655],
    value: 100,
    status: 'Muy malo',
  },
];

export default function Mapa() {
  return (
    <section className="h-screen w-screen">
      <Map {...data} />
    </section>
  );
}
