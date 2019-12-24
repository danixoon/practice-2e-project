import React, { useEffect, useState } from "react";
import { connect, ConnectedComponent } from "react-redux";
import { IRootState } from "../reducers";
import { setPage } from "../actions/appActions";

// import * as reactSpring from "react-spring";

import * as _ from "lodash";

import "../styles/game.scss";

const { useSpring, animated } = require("react-spring");

const Foo: React.FC<{}> = props => {
  return <div>hi</div>;
};

const mapDispatch = {};

const mapState = (s: IRootState, what: any) => {};

export default connect(mapState, mapDispatch)(Foo);
