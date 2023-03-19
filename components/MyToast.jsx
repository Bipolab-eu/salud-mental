import { useEffect, useRef } from 'react';
import * as Toast from '@radix-ui/react-toast';
import '@/styles/toast.scss';
import Link from 'next/link';

// function oneWeekAway(date) {
//   const now = new Date();
//   const inOneWeek = now.setDate(now.getDate() + 7);
//   return new Date(inOneWeek);
// }

function prettyDate(date) {
  return new Intl.DateTimeFormat('es-ES', { dateStyle: 'full', timeStyle: 'short' }).format(date);
}

function ToastDemo({ message, open, setOpen }) {
  const eventDateRef = useRef(new Date());
  const timerRef = useRef(0);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  return (
    <Toast.Provider swipeDirection="top">
      <Toast.Root className="ToastRoot" open={open} onOpenChange={setOpen}>
        <Toast.Title className="ToastTitle">
          {message}
        </Toast.Title>
        <Toast.Description asChild>
          <time className="ToastDescription" dateTime={eventDateRef.current.toISOString()}>
            {prettyDate(eventDateRef.current)}
          </time>
        </Toast.Description>
        <Toast.Action className="ToastAction" asChild altText="Goto schedule to undo">
          <Link
            href="/"
            className="Button small green"
          >
            Volver
          </Link>
        </Toast.Action>
      </Toast.Root>
      <Toast.Viewport className="ToastViewport" />
    </Toast.Provider>
  );
}

export default ToastDemo;
