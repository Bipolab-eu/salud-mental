import './styles/globals.scss';
import './styles/tailwind.globals.scss';
import fontInter from './styles/fonts';

import { AppContextProvider } from './context/store';

export const metadata = {
  title: 'Salud mental',
  description: 'Encuesta para hacer un estudio de la salud mental de los adolescentes en institutos',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${fontInter.className} snap-y snap-mandatory`}>
        <AppContextProvider>
          {children}
          <footer className="fixed bottom-0 flex justify-center w-full py-2">
            <p>Powered by Bipolab</p>
          </footer>
        </AppContextProvider>
      </body>
    </html>
  );
}
