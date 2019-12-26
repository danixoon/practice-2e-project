import React, { useEffect, useState } from "react";
import { connect, ConnectedComponent } from "react-redux";
import axios, { AxiosResponse } from "axios";

import { IRootState } from "../../reducers";
import { setPage } from "../../actions/appActions";
import { useInput } from "../../hooks";

import Input from "../../components/Input";

import * as _ from "lodash";
import "./style.scss";
import { stat } from "fs";

const getResponseMessage = (status: number) => {
  if (status === 0) return;
  else if (status === -1) return "Загрузка";
  else if (status === 200) return "Выполнено";
  else return "Ошибка";
};

interface AuthProps {}

const Auth: React.FC<AuthProps> = props => {
  const [bindAuth, authData] = useInput<any>();
  const [status, setStatus] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .get("/api/auth", { params: authData })
      .then(res => {
        setStatus(res.status);
        console.log("Token: " + res.data);

        axios.defaults.headers.common["Authorization"] = res.data;
      })
      .catch(err => setStatus(500));

    setStatus(-1);
  };

  const handleTest = () => {
    axios
      .get("/api/test")
      .then(() => console.log("success"))
      .catch(() => console.log("error.."));
  };

  return (
    <section className="auth-page">
      <form onSubmit={handleSubmit}>
        <Input {...bindAuth("username")} label="Имя пользователя" />
        <Input {...bindAuth("password")} type="password" label="Пароль" />
        <button disabled={status === -1} type="submit">
          {getResponseMessage(status) || "Войти"}
        </button>
      </form>
      {(() => {
        // if (status !== 200) return;

        return (
          <>
            <button onClick={handleTest}>Тест</button>
          </>
        );
      })()}
    </section>
  );
};

const mapDispatch = {};

const mapState = (s: IRootState, what: any) => {};

export default connect(mapState, mapDispatch)(Auth);
