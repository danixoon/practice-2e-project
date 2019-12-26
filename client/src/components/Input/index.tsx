import React from "react";

import "./style.scss";

interface InputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label: string;
}

const Input: React.FC<InputProps> = props => {
  const { label, ...rest } = props;
  return (
    <>
      <label className="input-label">{label}</label>
      <input {...rest} className={"input " + (rest.className || "")} />
    </>
  );
};

export default Input;
