import { RefObject, useEffect } from "react";
type Props<T> = {
  ref: RefObject<T>;
  handler: () => void;
};

export const useClickOutside = <T extends HTMLElement = HTMLElement>({
  ref,
  handler,
}: Props<T>) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !event.composedPath().includes(ref.current)) {
        handler();
      }
    };
    document.body.addEventListener("click", handleClickOutside);

    return () => document.body.removeEventListener("click", handleClickOutside);
  }, []);
};
