/* eslint-disable react/jsx-no-bind */
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import * as Form from '@radix-ui/react-form';

import useSWR from 'swr';
import Selector from './Selector';

const GENERO_OPTIONS = [
  'Masculino',
  'Femenino',
  'Binario',
  'Fluido',
  'Transexual',
  'Neutro',
  'No conforme',
];

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Login() {
  const router = useRouter();
  const [errors, setErrors] = useState([]);

  const { data } = useSWR('/api/centros', fetcher);

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentErrors = [];

    setErrors([]);
    const formData = Object.fromEntries(new FormData(e.currentTarget));
    if (!formData.genero) currentErrors.push('genero');
    if (!formData.instituto) currentErrors.push('centro');

    setErrors(currentErrors);

    if (currentErrors.length === 0) router.push(`/encuesta/?e=${formData.edad}&g=${formData.genero}&c=${formData.instituto}`);
  };

  function onValueChange() {
    setErrors([]);
  }

  return (
    <div className="lg:w-auto  w-screen h-screen p-8 grid">
      {JSON.stringify(errors)}
      <h4 className="mt-auto pb-10 block mx-auto leading-4">
        Antes de empezar
        <br />
        cuéntanos un poco sobre tí.
      </h4>
      <Form.Root className="w-full" onSubmit={handleSubmit}>
        <Form.Field className="grid pb-3 mb-3" name="edad">
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
            }}
          >
            <Form.Message
              className="text-#fcc4c4 opacity-80 pb-1"
              match="valueMissing"
            >
              ¿Qué edad tienes?
            </Form.Message>
            <Form.Message
              className="text-#fcc4c4 opacity-80 pb-1"
              match="rangeOverflow"
            >
              Por favor, por tu edad correcta
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              name="edad"
              className="w-full text-center py-4 px-3 box-border inline-flex items-center justify-center text-violet11 rounded-full text-xs"
              type="number"
              placeholder="Edad"
              required
              min={11}
              max={20}
            />
          </Form.Control>
        </Form.Field>
        <Form.Field className="grid pb-3 mb-3" name="genero">
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
            }}
          >
            {errors.includes('genero') && (
              <Form.Message
                className="text-#fcc4c4 opacity-80 pb-1"
                name="genero"
              >
                Introduce tu género(opcional)
              </Form.Message>
            )}
          </div>
          <Selector
            name="Genero"
            options={GENERO_OPTIONS}
            onValueChange={onValueChange}

          />
        </Form.Field>
        <Form.Field className="grid pb-3 mb-3" name="instituto">
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
            }}
          >
            {errors.includes('centro') && (
            <Form.Message className="text-#fcc4c4 opacity-80 pb-1">
              Por favor selecciona un instituto
            </Form.Message>
            )}
          </div>
          <Selector
            name="Instituto"
            onValueChange={onValueChange}
            options={data?.map((el) => el.nombre)}
          />
        </Form.Field>
        <Form.Submit asChild>
          <button
            type="submit"
            className="bg-white hover:bg-mauve3 text-violet11 rounded-full inline-flex text-xs font-medium py-4 px-4"
            style={{ marginTop: 10 }}
          >
            Empezar encuesta
          </button>
        </Form.Submit>
      </Form.Root>
    </div>
  );
}
