// const inter = Inter({ subsets: ['latin'] })

'use client';

import dynamic from 'next/dynamic';

const Map = dynamic(() => import('../components/Map'), { ssr: false });

const data = [
  {
    center: 'IES Siete Palmas',
    position: [28.10651, -15.45008],
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

export default function App() {
  return (
    <main className="h-screen text-center">
      <Map {... data} />
    </main>
  );
}
