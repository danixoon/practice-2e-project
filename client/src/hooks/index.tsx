import { useState } from "react";

export const useInput = () => {
  const [input, setInput] = useState({});
  return [
    {
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput({ ...input, [e.target.name]: e.target.value });
      }
    },
    input
  ];
};
