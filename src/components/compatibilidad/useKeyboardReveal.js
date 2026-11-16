"use client";

import { useEffect, useState } from "react";

const LIST_MAX_HEIGHT = 380;
const LIST_MIN_HEIGHT = 160;
const LIST_COMFORT_HEIGHT = 220; // con este espacio bajo el campo ya se ven unas 4 especies
const REVEAL_GAP = 12; // aire arriba del campo y debajo de la lista
const KEYBOARD_DELAY_MS = 500; // espera máxima si la pantalla no avisa que el teclado subió
const KEYBOARD_MIN_RESIZE = 100; // cambios menores son la barra del navegador, no el teclado
const VIEWPORT_QUIET_MS = 150; // sin moverse este tiempo, la pantalla ya está quieta
const REVEAL_TOLERANCE = 8; // margen para considerar que el campo no quedó tapado arriba

// Para el onMouseDown del campo. En el celular, al tocarlo Safari mueve la página por su
// cuenta (y hace saltar el menú fijo) aunque el campo ya se vea. Aquí se enfoca a mano sin ese
// movimiento: de acomodar la página, solo si hace falta, se encarga useKeyboardReveal.
export function focusWithoutScroll(event) {
  if (document.activeElement === event.currentTarget) return;
  if (!window.matchMedia("(pointer: coarse)").matches) return;
  event.preventDefault();
  event.currentTarget.focus({ preventScroll: true });
}

// En el celular el teclado tapa la lista, que abre hacia abajo: al abrirla se sube el campo
// hasta arriba de la pantalla y la lista se ajusta al espacio que queda sobre el teclado.
// Solo se mueve si hace falta: si bajo el campo ya cabe la lista, la página se queda quieta.
// Safari mueve la página por su cuenta mientras sube el teclado; si se corrige en medio de
// ese movimiento la página salta. Por eso se espera a que la pantalla se quede quieta y se
// acomoda una sola vez.
// Devuelve la altura máxima (px) que puede tener la lista.
//   inputRef: el campo de búsqueda · isOpen: si la lista está abierta
//   listOffset: separación (px) entre el campo y la lista
export function useKeyboardReveal(inputRef, isOpen, listOffset) {
  const [listMaxH, setListMaxH] = useState(LIST_MAX_HEIGHT);

  useEffect(() => {
    const viewport = window.visualViewport;
    if (!isOpen || !viewport || !window.matchMedia("(pointer: coarse)").matches) return;

    const reveal = () => {
      const input = inputRef.current;
      if (!input) return;
      const rect = input.getBoundingClientRect();
      // El menú fijo solo quita espacio si quedó dentro de la parte visible de la pantalla
      const headerBottom = document.querySelector("header")?.getBoundingClientRect().bottom ?? 0;
      const top = Math.max(0, headerBottom - viewport.offsetTop) + REVEAL_GAP;
      const visibleTop = rect.top - viewport.offsetTop;
      const roomBelow = topAt => viewport.height - topAt - rect.height - listOffset - REVEAL_GAP;

      // Si el campo ya se ve y debajo cabe bien la lista, la página no se mueve
      const fitsHere =
        visibleTop >= top - REVEAL_TOLERANCE && roomBelow(visibleTop) >= LIST_COMFORT_HEIGHT;
      if (fitsHere) {
        setListMaxH(Math.min(LIST_MAX_HEIGHT, roomBelow(visibleTop)));
        return;
      }

      window.scrollBy({ top: visibleTop - top, behavior: "smooth" });
      setListMaxH(Math.max(LIST_MIN_HEIGHT, Math.min(LIST_MAX_HEIGHT, roomBelow(top))));
    };

    // Cada movimiento de la pantalla (teclado subiendo, Safari acomodando) reinicia la espera
    let timer = setTimeout(reveal, KEYBOARD_DELAY_MS);
    let lastHeight = viewport.height;
    let isSettled = false;
    const onViewportChange = () => {
      const keyboardMoved = Math.abs(viewport.height - lastHeight) >= KEYBOARD_MIN_RESIZE;
      // Ya acomodado, solo se repite si el teclado aparece o se esconde
      if (isSettled && !keyboardMoved) return;
      lastHeight = viewport.height;
      isSettled = false;
      clearTimeout(timer);
      timer = setTimeout(() => {
        isSettled = true;
        reveal();
      }, VIEWPORT_QUIET_MS);
    };
    viewport.addEventListener("resize", onViewportChange);
    viewport.addEventListener("scroll", onViewportChange);
    return () => {
      clearTimeout(timer);
      viewport.removeEventListener("resize", onViewportChange);
      viewport.removeEventListener("scroll", onViewportChange);
    };
  }, [inputRef, isOpen, listOffset]);

  return listMaxH;
}
