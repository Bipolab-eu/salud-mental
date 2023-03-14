import './styles/globals.scss';
import './styles/tailwind.globals.scss';
import Head from 'next/head';
import fontInter from './styles/fonts';

export const metadata = {
  title: 'Salud mental adolescentes',
  description: 'Encuesta para hacer un estudio de la salud mental de los adolescentes en',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta name="title" content={metadata.title} />
        <meta name="description" content={metadata.description} />
      </Head>
      <body className={`${fontInter.className} snap-y snap-mandatory`}>
        {children}
        <footer className="fixed bottom-0 flex justify-center w-full py-2">
          <p>Powered by Bipolab</p>
        </footer>
      </body>
    </html>
  );
}
