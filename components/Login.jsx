/* eslint-disable react/jsx-no-bind */

'use client';

import { useState, useEffect } from 'react';
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
  const [codeIsValid, setCode] = useState({
    valid: true,
    error: null,
  });
  const [centros, setCentros] = useState({});
  const router = useRouter();
  const [errors, setErrors] = useState([]);

  const { data } = useSWR('/api/centros', fetcher);

  useEffect(() => {
    const insitutos = {};

    if (typeof data !== 'undefined' && !data.clientVersion) {
      data?.forEach((centro) => {
        insitutos[centro.id] = { value: centro.id, label: centro.nombre };
      });
    }

    if (Object.keys(insitutos).length) setCentros(insitutos);
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget));
    const currentErrors = [];
    try {
      const response = await fetch(`/api/check-code/?centroId=${formData.instituto}&codigo=${formData.codigo}`);

      const { valid, error, id } = await response.json();

      if (error) setCode({ valid, error });

      const {
        edad,
        genero,
        codigo,
        instituto,
      } = formData;

      if (currentErrors.length === 0 && valid) {
        router.push(`/encuesta/?edad=${edad}&genero=${genero}&centroId=${instituto}&codigoId=${id}`);
      }
    } catch (error) {
      console.log(error);
    }

    setErrors([]);
    if (!formData.genero) currentErrors.push('genero');
    if (!formData.instituto) currentErrors.push('centro');

    setErrors(currentErrors);
  };

  function onValueChange() {
    setErrors([]);
  }

  return (
    <div className="lg:w-auto  w-screen h-screen p-8 grid">
      <h4 className="mt-auto pb-10 block mx-auto leading-4">
        Antes de empezar
        <br />
        cuéntanos un poco sobre tí.
      </h4>
      <Form.Root className="w-full" onSubmit={handleSubmit}>
        <Form.Field className="grid pb-3 mb-3" name="codigo">
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
              Por favor introduce un código
            </Form.Message>
            {!codeIsValid.valid && (
              <Form.Message
                className="text-#fcc4c4 opacity-80 pb-1"
              >
                {codeIsValid.error}
              </Form.Message>
            )}
          </div>
          <Form.Control asChild>
            <input
              name="codigo"
              className="w-full text-center py-4 px-3 box-border inline-flex items-center justify-center text-violet11 rounded-full text-xs"
              type="text"
              placeholder="Código"
              required
            />
          </Form.Control>
        </Form.Field>
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
            options={GENERO_OPTIONS.map((genero) => ({ label: genero, value: genero }))}
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
            options={centros}
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
