'use client';

import * as Popover from '@radix-ui/react-popover';
import * as Separator from '@radix-ui/react-separator';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as Form from '@radix-ui/react-form';
import { CheckIcon, Cross2Icon, InfoCircledIcon } from '@radix-ui/react-icons';

async function createUser(user) {
  const response = await fetch('/api/auth', {
    method: 'POST',
    body: JSON.stringify(user),
  });

  return response.json();
}

export default function Auth() {
  const openModal = () => {
    console.log('Open');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget));

    const response = await createUser(formData);
    console.log(response);
  };

  return (
    <main className="login-main grid h-screen text-center px-4 justify-items-center lg:bg-lg md:bg-md bg-sm">
      <h1 className="py-[70px] text-2xl">Bienvenido </h1>
      <Separator.Root className="bg-violet6 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px mb-[10px]" />
      <div className="text-sm">
        <h2 className="my-auto pb-5 text-2xl">Copy de bienvenida</h2>
        <p>
          Copy breve descripción
          <p className="pt-3">
            Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Cumque reiciendis eaque voluptas, ipsum, animi iure
            deserunt ut maiores similique cum mollitia quidem neque quisquam
            praesentium minima voluptatibus beatae expedita. Magni?

          </p>
        </p>
      </div>
      <Separator.Root className="bg-violet6 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px my-[10px]" />
      <ul className="text-left list-disc text-sm  text-mauve1 px-5">
        Si eres director o profesor de un centro y quieres participar en nuestro
        programa para evaluar la salud mental deberá&nbsp;
        <Popover.Root>
          <Popover.Trigger asChild>
            <button name="trigger" type="button" onClick={openModal}>
              deberá rellenar el siguiente&nbsp;
              <span className="underline">formulario</span>
              <span>.</span>
            </button>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content
              className="rounded p-5 w-[260px] bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
              sideOffset={5}
            >
              <div className="flex flex-col gap-2.5">
                <p className="text-mauve12 text-[15px] leading-[19px] font-medium mb-2.5">
                  Dimensions
                </p>
                <fieldset className="flex gap-5 items-center">
                  <label
                    className="text-[13px] text-violet11 w-[75px]"
                    htmlFor="width"
                  >
                    Width
                  </label>
                  <input
                    className="w-full inline-flex items-center justify-center flex-1 rounded px-2.5 text-[13px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 h-[25px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 outline-none"
                    id="width"
                    defaultValue="100%"
                  />
                </fieldset>
                <fieldset className="flex gap-5 items-center">
                  <label
                    className="text-[13px] text-violet11 w-[75px]"
                    htmlFor="maxWidth"
                  >
                    Max. width
                  </label>
                  <input
                    className="w-full inline-flex items-center justify-center flex-1 rounded px-2.5 text-[13px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 h-[25px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 outline-none"
                    id="maxWidth"
                    defaultValue="300px"
                  />
                </fieldset>
                <fieldset className="flex gap-5 items-center">
                  <label
                    className="text-[13px] text-violet11 w-[75px]"
                    htmlFor="height"
                  >
                    Height
                  </label>
                  <input
                    className="w-full inline-flex items-center justify-center flex-1 rounded px-2.5 text-[13px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 h-[25px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 outline-none"
                    id="height"
                    defaultValue="25px"
                  />
                </fieldset>
                <fieldset className="flex gap-5 items-center">
                  <label
                    className="text-[13px] text-violet11 w-[75px]"
                    htmlFor="maxHeight"
                  >
                    Max. height
                  </label>
                  <input
                    className="w-full inline-flex items-center justify-center flex-1 rounded px-2.5 text-[13px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 h-[25px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 outline-none"
                    id="maxHeight"
                    defaultValue="none"
                  />
                </fieldset>
              </div>
              <Popover.Close
                className="rounded-full h-[25px] w-[25px] inline-flex items-center justify-center text-violet11 absolute top-[5px] right-[5px] hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 outline-none cursor-default"
                aria-label="Close"
              >
                <Cross2Icon />
              </Popover.Close>
              <Popover.Arrow className="fill-white" />
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
        <li className="mt-2 text-xs">
          El profesorado deberá que rellenar éste pequeño formulario para poder
          acceder y generar códigos a repartir entre sus alumnos.
        </li>
        <li className="text-xs">
          Podrá registrarse tanto personal como el centro requiera.
        </li>
        <li className="text-xs">
          Una vez enviado el formulario recibirá un email con el siguiente paso.
        </li>
      </ul>
      <div>*</div>
      <div>
        <Separator.Root className="mb-4 bg-violet6 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px mt-[10px]" />
        <Form.Root onSubmit={handleSubmit} className="">
          <Form.Field className="grid mb-[10px]" name="email">
            <div className="flex items-baseline justify-between">
              <Form.Label className="text-[14px] font-medium leading-[35px] text-white flex">
                Ya dispongo de acceso
                <InfoCircledIcon className="my-auto ml-1" type="button" />
              </Form.Label>
              <Form.Message
                className="text-[13px] text-white opacity-[0.8]"
                match="valueMissing"
              >
                Please enter your email
              </Form.Message>
              <Form.Message
                className="text-[13px] text-white opacity-[0.8]"
                match="typeMismatch"
              >
                Please provide a valid email
              </Form.Message>
            </div>
            <Form.Control asChild>
              <input
                className="box-border w-full bg-blackA5 shadow-blackA9 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-white shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA9"
                type="email"
                placeholder="centro@email.com"
                required
              />
            </Form.Control>
          </Form.Field>
          <Form.Field asChild>
            <div className="flex">
              <Checkbox.Root
                className="shadow-blackA7 hover:bg-violet3 my-auto mr-2 flex h-[17px] w-[17px] appearance-none items-center justify-center rounded-[4px] bg-white shadow-[0_2px_10px] outline-none focus:shadow-[0_0_0_2px_black]"
                defaultChecked
                id="checkbox"
              >
                <Checkbox.Indicator className="text-violet11">
                  <CheckIcon />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <Form.Label className="text-[13px] font-medium leading-[35px] text-white">
                Acepto&nbsp;
                <button type="button" className="underline">
                  términos y condiciones.
                </button>
              </Form.Label>
            </div>
          </Form.Field>
          <Form.Submit asChild>
            <button
              type="button"
              className="box-border w-full text-violet11 shadow-blackA7 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none mt-[10px]"
            >
              Entrar
            </button>
          </Form.Submit>
        </Form.Root>
      </div>
    </main>
  );
}
