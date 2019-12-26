import { useState } from "react";

type InputBinder = (name: string) => { onChange: (e: React.ChangeEvent<HTMLInputElement>) => void };

export const useInput = <T extends {} = any>() => {
  const [input, setInput] = useState<T>({} as T);
  return [
    (name: string) => ({
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput({ ...input, [name]: e.target.value });
      }
    }),
    input
  ] as [InputBinder, T];
};
