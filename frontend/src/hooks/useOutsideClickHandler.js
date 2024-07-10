import { useEffect } from "react";

const useOutsideClickHandler = (ref, onOutsideClick) => {
  useEffect(() => {
    const handleClickOutside = (ev) => {
      if (ref.current && !ref.current.contains(ev.target)) {
        onOutsideClick(ev);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onOutsideClick]);
};

export default useOutsideClickHandler;
