import React, { ComponentType } from "react";
import ReactDOM from "react-dom";

export const withMount = (Component: ComponentType) => (el: Element) => {
  ReactDOM.render(<Component />, el);
};
