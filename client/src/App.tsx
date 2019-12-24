import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { IRootState } from "./reducers";

import Auth from "./pages/Auth";

import "./theme.scss";

interface IAppProps {}

const App: React.FC<IAppProps> = props => {
  return <Auth />;
};

const mapState = (state: IRootState) => ({});
const mapActions = {};

export default connect(mapState, mapActions)(App);
