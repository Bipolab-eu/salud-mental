/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-restricted-syntax */

'use client';

import axios from 'axios';
import * as RadioGroup from '@radix-ui/react-radio-group';
import * as Separator from '@radix-ui/react-separator';
import * as Label from '@radix-ui/react-label';

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
  ['¿Sitnes que tienes suficione apoyo emocional de tu entorno?', model6],
];
// const fetcher = (...args) => fetch(...args);

export default function Encuesta() {
  const alumno = {
    nombre: 'Marcos',
    email: 'marcosa.mm@icloud.com',
    apellidos: 'Marrero Miranda',
    centro: 'Siete palmas',
    documento_identidad: '44722126YS',
  };

  async function sentTest(data) {
    const response = await axios.post('/api/send-test', data, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    return response;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget));
    const test = [];

    for (const [key, val] of Object.entries(formData)) {
      const answerValues = val.split('-');
      test.push({ question: key.slice(1), answer: answerValues[0], value: +answerValues[1] });
    }
    await sentTest({ ...alumno, test });
  };

  return (

    <form onSubmit={handleSubmit} className="py-10 px-6">
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
        className="block mx-auto my-12 py-4 px-sm text-[#5746A] rounded-full bg-neutral-50 px-6 text-xs font-medium leading-normal text-neutral-800 shadow-[0_1px_9px_-4px_#ffff] transition duration-150 ease-in-out hover:bg-neutral-100 hover:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.3),0_4px_18px_0_rgba(251,251,251,0.2)] focus:bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.3),0_4px_18px_0_rgba(251,251,251,0.2)] focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.3),0_4px_18px_0_rgba(251,251,251,0.2)]"
      >
        Finalizar encuesta
      </button>
    </form>
  );
}
