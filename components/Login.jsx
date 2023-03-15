/* eslint-disable react/jsx-no-bind */

'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import * as Form from '@radix-ui/react-form';

import Selector from './Selector';
import { useAppContext } from '@/context/store';

const GENERO_OPTIONS = [
  'Masculino',
  'Femenino',
  'Binario',
  'Fluido',
  'Transexual',
  'Neutro',
  'No conforme',
];

export default function Login() {
  const form = useRef();
  const [submitDisable, setSubmitDisable] = useState(false);
  const [loading, setLoading] = useState(false);
  const { centros } = useAppContext();
  const [codeIsValid, setCode] = useState({
    valid: true,
    error: null,
  });
  const router = useRouter();
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    setLoading(true);
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
        instituto,
      } = formData;

      if (currentErrors.length === 0 && valid) {
        router.push(`/encuesta/?edad=${edad}&genero=${genero}&centroId=${instituto}&codigoId=${id}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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
    <section className="w-2/3 h-screen grid justify-items-center md:w-1/3 lg:w-1/3 sm:w-1/3">
      <h4 className="mt-auto pb-10 block leading-4">
        Antes de empezar
        <br />
        cuéntanos un poco sobre tí.
      </h4>
      <Form.Root ref={form} onSubmit={handleSubmit}>
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
            <Form.Message
              className="text-#fcc4c4 opacity-80 pb-1"
              match="rangeUnderflow"
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
              min={12}
              max={18}
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
            onOpenChange={() => setSubmitDisable(!submitDisable)}
            options={centros}
          />
        </Form.Field>
        <Form.Submit asChild>
          <button
            disabled={submitDisable}
            type="submit"
            className="min-w-max md:min-w-min flex mx-auto justicy-center bg-white hover:bg-mauve3 text-violet11 rounded-full text-xs font-medium py-4 px-4"
          >
            {loading ? (
              <div className="w-20">
                <svg aria-hidden="true" className="w-4 h-4 mx-auto text-gray-200 animate-spin fill-violet-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
              </div>
            )
              : (
                <span className="mx-auto">
                  Empezar encuesta
                </span>
              )}
          </button>
        </Form.Submit>
      </Form.Root>
    </section>
  );
}
