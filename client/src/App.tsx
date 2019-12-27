import React, { useEffect, useState } from "react";
import axios from "axios";
import { push } from "connected-react-router";
import { connect } from "react-redux";
import { IRootState } from "./reducers";
import { Route, Switch, Redirect } from "react-router"; // react-router v4/v5

import Auth from "./pages/Auth";
import User from "./pages/User";
import { AppPage } from "./types";

import "./theme.scss";
import { setAccountToken, setAccountData } from "./actions/accountAction";

interface IAppProps {
  page: AppPage;
  setAccountToken: typeof setAccountToken;
  setAccountData: typeof setAccountData;
  push: typeof push;
  token: string | null;
}

const App: React.FC<IAppProps> = props => {
  const { setAccountData, setAccountToken, push, token } = props;

  const [checked, setCheckStatus] = useState(false);

  const handleTokenCheck = async (token: string) => {
    const result = await axios.get("/api/account/check", { params: { token } }).catch(console.error);
    if (result) {
      const { valid, ...accountData } = result.data;
      if (valid) {
        setAccountToken(token);
        setAccountData(accountData);
      }
    }

    setCheckStatus(true);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      handleTokenCheck(token);
    } else {
      setCheckStatus(true);
      push("/auth");
    }
  }, []);

  if (!checked) return <div>Загрузка..</div>;
  else
    return (
      <Switch>
        <Route exact path="/" render={() => (token ? <Redirect to="/control" /> : <Redirect to="/auth" />)} />
        <Route path="/auth" render={() => (token ? <Redirect to="/control" /> : <Auth />)} />
        <Route path="/control" render={() => (!token ? <Redirect to="/auth" /> : <User />)} />
        <Route render={() => <div>404</div>} />
      </Switch>
    );
};

const mapState = (state: IRootState) => ({
  page: state.app.page,
  role: state.account.role,
  token: state.account.token
});
const mapActions = { setAccountData, setAccountToken, push };

export default connect(mapState, mapActions)(App);
