import React, { useEffect, useState } from "react";
import { connect, ConnectedComponent } from "react-redux";
import { IRootState } from "../../reducers";
import { setPage } from "../../actions/appActions";
import { useInput } from "../../hooks";

import Input from "../../components/Input";

import * as _ from "lodash";
import "./style.scss";

const { useSpring, animated } = require("react-spring");

interface AuthProps {}

const Auth: React.FC<AuthProps> = props => {
  const [bindAuth, authData] = useInput();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(authData);
  };

  return (
    <section className="auth-page">
      <form onSubmit={handleSubmit}>
        <Input {...bindAuth} name="username" label="Имя пользователя" />
        <Input {...bindAuth} name="password" label="Пароль" />
        <button type="submit">Войти</button>
      </form>
    </section>
  );
};

const mapDispatch = {};

const mapState = (s: IRootState, what: any) => {};

export default connect(mapState, mapDispatch)(Auth);
