'use client';

import {
  createContext,
  useContext,
  useMemo,
} from 'react';

import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());
const AppContext = createContext();

function mapData(centros) {
  const institutos = {};
  if (centros) {
    centros.forEach((centro) => {
      institutos[centro.id] = { value: centro.id, label: centro.nombre };
    });
  }
  return institutos;
}

export function AppContextProvider({ children }) {
  const { data } = useSWR('/api/centros', fetcher);
  const store = useMemo(() => ({
    centros: mapData(data),
    mapaData: data,
  }), [data]);

  return (
    <AppContext.Provider value={store}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
