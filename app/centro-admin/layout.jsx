'use client';

import { ExitIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

function CentroLayout({ children }) {
  const centro = {};
  const logoutFunction = () => {
    console.log('logout');
  };
  return (
    <>
      <header className="py-4 px-5 text-sm bg-white text-mauve12">
        <div className="flex">
          <Link
            href={`/mapa/?coordenadas=${centro.coordenadas}`}
          >
            IES ROQUE AMAGRO
          </Link>
          <button
            className="ml-auto"
            type="button"
            onClick={logoutFunction}
          >

            <ExitIcon />
          </button>
        </div>
      </header>
      <div>{children}</div>
    </>
  );
}

export default CentroLayout;
