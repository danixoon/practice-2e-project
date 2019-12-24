import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { IRootState } from "./reducers";


import "./styles/default.scss";
import "./styles/app.scss";

interface IAppProps {}

const App: React.FC<IAppProps> = props => {
  return <div>app</div>;
};

const mapState = (state: IRootState) => ({});
const mapActions = {};

export default connect(mapState, mapActions)(App);
