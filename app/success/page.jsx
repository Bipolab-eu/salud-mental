import Image from 'next/image';
import Link from 'next/link';

import group from '../../public/Group.png';

export default function page() {
  return (
    <main className="">
      <section className="flex justify-center items-center h-screen text-center">
        <div className="w-full">
          <Image
            className="m-auto"
            src={group}
            alt="Imagen de mujer con corazones en la mano"
          />
          <p className="text-xs my-6">
            Gracias por tu confianza.
            <br />
            Al participar, nos ayudas a construir
            <br />
            un mejor ambiente escolar.
          </p>
          <Link
            href="/mapa"
            type="button"
            className="mx-auto my-6 py-4 px-sm rounded-full bg-white text-violet11 px-6 text-xs font-medium leading-normal transition duration-150 ease-in-out hover:bg-neutral-100 "
          >
            Ver Datos
          </Link>
        </div>
      </section>
    </main>
  );
}
