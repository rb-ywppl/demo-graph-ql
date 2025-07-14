import { useState } from "react";

export default function useToggle(defaultChecked: boolean = false) {
  const [toggle, setToggle] = useState<boolean>(defaultChecked);

  return {
    toggle,
    onToggle: () => setToggle((prev) => !prev),
    onOpen: () => setToggle(true),
    onClose: () => setToggle(false),
    setToggle,
  };
}
