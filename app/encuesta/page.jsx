'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import * as RadioGroup from '@radix-ui/react-radio-group';
import * as Separator from '@radix-ui/react-separator';
import * as Label from '@radix-ui/react-label';

// import { v4 as uuidv4 } from 'uuid';

import {
  model1,
  model2,
  model3,
  model4,
  model5,
  model6,
  model7,
} from './models';

const questions = [
  ['¿Con qué frecuencia te sientes triste o deprimido/a?', model1],
  ['¿Te sientes cansado/a o agotado/a con frecuencia?', model1],
  ['¿Te cuesta concentrarte o mantener la atención en las tareas?', model2],
  ['¿Has tenido dificultades para dormir?', model2],
  ['¿Te sientes ansioso/a o preocupado/a la mayor parte del tiempo?', model3],
  ['¿Has notado cambios en tu apetito en los últimos meses?', model7],
  ['¿Sientes que has perdido interés en las actividades que solías disfrutar?', model4],
  ['¿Te has sentido tan triste o deprimido/a que has pensado en hacerte daño?', model1],
  ['¿Te sientes cómodo/a hablando sobre tus sentimientos con otras personas?', model5],
  ['¿Sientes que tienes suficione apoyo emocional de tu entorno?', model6],
];
// const fetcher = (...args) => fetch(...args);

function sendTest(data) {
  const response = fetch('/api/send-test', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return response;
}

export default function Encuesta() {
  const formRef = useRef();
  const router = useRouter();
  const [submitLabel, setSubmitLabel] = useState('Finalizar encuesta');

  const formatTest = (formData) => {
    const test = [];

    Object.entries(formData).forEach((key) => {
      const answerValues = key[1].split('-');
      test.push({ question: key[0], answer: answerValues[0], value: +answerValues[1] });
    });

    return test;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget));
    const test = formatTest(formData);

    const getParams = (uri) => Object.fromEntries(new URLSearchParams(uri?.split('?')[1]));
    const params = getParams(window.location.href);

    const {
      edad,
      genero,
      codigoId,
      centroId,
    } = params;

    await sendTest({
      edad: +edad,
      genero,
      codigoId: +codigoId,
      centroId: +centroId,
      test,
    })
      .then(() => {
        setSubmitLabel(
          <div role="status" className="flex text-violet11">
            <span>Guardando..</span>
            <svg aria-hidden="true" className="mx-2 w-4 h-4 mr-2 text-gray-200 animate-spin fill-violet-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
          </div>,
        );
        setTimeout(() => {
          router.push('/success');
        }, 500);
      })
      .catch((error) => {
        console.log(error);
      });
    formRef.current.reset();
  };

  return (
    <main>
      <form ref={formRef} onSubmit={handleSubmit} className="py-10 px-6">
        <Label.Root className="text-[12px] font-light leading-[35px] text-white" htmlFor="q1" />
        { questions.map((question, idx) => (
          <div key={question}>
            <p className="text-[12px] my-4">{question[0]}</p>
            <RadioGroup.Root
              name={`q${idx + 1}`}
              className="flex flex-col gap-2.5"
              defaultValue="default"
              aria-label="View density"
              required
            >
              {Object.keys(question[1]).map((option) => (
                <div key={option} className="flex items-center">
                  <RadioGroup.Item
                    className="bg-white w-[25px] h-[25px] rounded-full shadow-[0_2px_10px] shadow-blackA7 hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black outline-none cursor-default"
                    value={`${question[1][option]}-${option.slice(1)}`}
                    id={option}
                    required
                  >
                    <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[50%] after:bg-violet11" />
                  </RadioGroup.Item>
                  <label className="text-white text-[12px] leading-none pl-[15px]" htmlFor={option}>
                    { question[1][option] }
                    {' '}
                  </label>
                </div>

              ))}
              <Separator.Root className="bg-violet6 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px my-[10px]" />
            </RadioGroup.Root>
          </div>
        ))}
        <button
          type="submit"
          className="block mx-auto my-12 py-4 px-sm text-[#5746A] rounded-full bg-neutral-50 pl-4 pr-2 text-xs font-medium leading-normal text-neutral-800 shadow-[0_1px_9px_-4px_#ffff] transition duration-150 ease-in-out hover:bg-neutral-100 hover:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.3),0_4px_18px_0_rgba(251,251,251,0.2)] focus:bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.3),0_4px_18px_0_rgba(251,251,251,0.2)] focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.3),0_4px_18px_0_rgba(251,251,251,0.2)]"
        >
          {submitLabel}
        </button>
      </form>
    </main>
  );
}
