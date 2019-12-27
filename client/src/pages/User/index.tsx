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
import { fetchProfile } from "../../actions/profileActions";
import { IProfileState } from "../../reducers/profileReducer";

interface UserProps {
  setPage: typeof setPage;
  accountLogout: typeof accountLogout;
  fetchProfile: typeof fetchProfile;
  profile: IProfileState;
}

const MainSection: React.FC<{ firstname: any; lastname: any; middlename: any }> = props => {
  const { firstname, middlename } = props;
  return <>{`Добро пожаловать, ${firstname} ${middlename}`}</>;
};

const User: React.FC<UserProps> = props => {
  const { accountLogout, fetchProfile, profile } = props;

  useEffect(() => {
    fetchProfile();
  }, []);

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
        <div className="selected-content">
          <MainSection {...profile} />
        </div>
      </div>
    </section>
  );
};

const mapDispatch = {
  setPage,
  accountLogout,
  fetchProfile
};
const mapState = (s: IRootState) => ({
  profile: s.profile
});

export default connect(mapState, mapDispatch)(User);
