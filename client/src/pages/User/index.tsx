import React, { useEffect, useState } from "react";
import { connect, ConnectedComponent } from "react-redux";
import axios, { AxiosResponse } from "axios";

import { IRootState } from "../../reducers";
import { setPage } from "../../actions/appActions";
import { useInput } from "../../hooks";

import Input from "../../components/Input";

import "./style.scss";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { accountLogout } from "../../actions/accountAction";

interface UserProps {
  setPage: typeof setPage;
  accountLogout: typeof accountLogout;
}

const User: React.FC<UserProps> = props => {
  const { accountLogout } = props;
  return (
    <section className="user-page">
      <Header>
        <button onClick={accountLogout} style={{ marginLeft: "auto" }}>
          Выйти из аккаунта
        </button>
      </Header>
      <div className="page-content">
        <Sidebar>
          <button>Основное</button>
          <button>Услуги квартиры</button>
          <button>Услуги дома</button>
          <button>Задолженности</button>
        </Sidebar>
        <div className="selected-content"> owo </div>
      </div>
    </section>
  );
};

const mapDispatch = {
  setPage,
  accountLogout
};
const mapState = (s: IRootState) => ({});

export default connect(mapState, mapDispatch)(User);
