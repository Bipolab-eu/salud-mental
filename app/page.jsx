// const inter = Inter({ subsets: ['latin'] })

'use client';

import Login from 'components/Login';

export default function App() {
  return (
    <main className="h-screen text-center snap-mandatory overflow-y-scroll flex flex-col items-center">
      <section>
        <Login />
      </section>
    </main>
  );
}
