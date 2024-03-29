'use client';

import { forwardRef } from 'react';

import { ChevronDownIcon } from '@radix-ui/react-icons';
import * as Accordion from '@radix-ui/react-accordion';
import * as Label from '@radix-ui/react-label';
import classNames from 'classnames';

import Selector from 'components/Selector';

import { useAppContext } from '@/context/store';

function CentroAdmin() {
  const { centros } = useAppContext();

  return (
    <main className="grid h-screen mx-4">
      <form className="my-auto">
        <div className="flex flex-wrap gap-[8px]">
          <label className="text-xs">Seleccione un centro</label>
          <Selector
            id="centros"
            name="Selecciona un centro"
            options={centros}
            classNames="centro-label"
          />
        </div>
        <div className="flex flex-wrap gap-[5px] py-4">
          <Label.Root className="block w-full">
            ¿Cuantos códigos necesita?
          </Label.Root>
          <input
            id="codigos"
            name="codigos"
            className="w-[100px] block h-[35px] rounded-full px-[10px] text-[12px] leading-none text-black outline-none focus:shadow-[0_0_0_1px_#fff] selection:color-white"
            type="number"
          />
        </div>
        <div className="flex flex-wrap gap-[5px] pb-4">
          <Label.Root className="block w-full">
            Email
          </Label.Root>
          <input
            id="email"
            name="email"
            className="w-full block h-[35px] rounded-full px-[10px] text-[12px] leading-none text-black outline-none focus:shadow-[0_0_0_1px_#fff] selection:color-white"
            type="email"
          />
        </div>
        <div className="bg-white text-black p-4 rounded-lg">
          ¡No te preocupes puedes facilitarnos un email donde recibir los códigos!
        </div>
      </form>
      <article>
        <Accordion.Root
          className="bg-mauve6 rounded-md"
          type="single"
          defaultValue="item-1"
          collapsible
        >
          <AccordionItem className="text-xs" value="item-1">
            <AccordionTrigger className="text-xs">¿Cuantos códigos puede tener un alumno?.</AccordionTrigger>
            <AccordionContent className="bg-white">Es responsabilidad del profesorado o personal del centro entrenar un único código a cada alumno.</AccordionContent>
          </AccordionItem>

          <AccordionItem className="text-xs" value="item-2">
            <AccordionTrigger className="text-xs">¿Cuantos códigos puedo solicitar?</AccordionTrigger>
            <AccordionContent className="bg-white">
              El profesor o personal del centro podrá solicitar tantos códigos como alumnos tenga a su cargo.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem className="text-xs" value="item-3">
            <AccordionTrigger className="text-xs">¿Cuantas veces puede realizar el test un alumno?</AccordionTrigger>
            <AccordionContent className="bg-white">
              El alumno podrá realizar el test cuantas veces quiera, por lo que también podra realizarlo en cualquier otro momento éste vea oportuno.
            </AccordionContent>
          </AccordionItem>
        </Accordion.Root>
      </article>
    </main>
  );
}
const AccordionItem = forwardRef(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Item
    className={classNames(
      'focus-within:shadow-mauve12 mt-px overflow-hidden first:mt-0 first:rounded-t last:rounded-b focus-within:relative focus-within:z-10',
      className,
    )}
    {...props}
    ref={forwardedRef}
  >
    {children}
  </Accordion.Item>
));

const AccordionTrigger = forwardRef(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Header className="flex">
    <Accordion.Trigger
      className={classNames(
        'text-mauve11 shadow-mauve1 hover:bg-mauve4 group flex h-[45px] flex-1 cursor-default items-center justify-between bg-white px-5 text-[15px] leading-none  outline-none',
        className,
      )}
      {...props}
      ref={forwardedRef}
    >
      {children}
      <ChevronDownIcon
        className="text-violet10 ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180"
        aria-hidden
      />
    </Accordion.Trigger>
  </Accordion.Header>
));

const AccordionContent = forwardRef(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Content
    className={classNames(
      'text-mauve11 bg-mauve2 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden text-[15px]',
      className,
    )}
    {...props}
    ref={forwardedRef}
  >
    <div className="py-[15px] px-5">{children}</div>
  </Accordion.Content>
));
export default CentroAdmin;
