'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import * as RadioGroup from '@radix-ui/react-radio-group';
import * as Separator from '@radix-ui/react-separator';
import * as Label from '@radix-ui/react-label';

import Toast from 'components/MyToast';

import SubmitButton from 'components/Button';
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

async function sendTest(data) {
  const response = await fetch('/api/send-test', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return response.json();
}

export default function Encuesta() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(false);

  const formRef = useRef();
  const router = useRouter();

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
    setLoading(true);
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

    const response = await sendTest({
      edad: +edad,
      genero,
      codigoId: +codigoId,
      centroId: +centroId,
      test,
    });

    if (response.ok) {
      setLoading(false);
      router.push('/success');
    } else {
      setError([...error, `Oh, algo ha salido mal, repite el cuestionario en otra ocación... \n ${response.toString()}`]);
      setOpen(true);
      setLoading(false);
    }

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
        <SubmitButton
          loading={loading}
        />
      </form>
      <Toast
        message="Ha habido algún problema al enviar tu encuesta, prueba en otro momento."
        open={open}
        setOpen={setOpen}
      />
    </main>
  );
}
