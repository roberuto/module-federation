import React from "react";
import ReactDom from "react-dom";

const LikeButtonMF = React.lazy(
  () => import("mf-components-library/LikeButton")
);
import { LikeButton } from "components-library/build";
import { ErrorBoundary } from "./ErrorBoundary";

const App = () => {
  return (
    <div>
      <h1>React NPM and MF components v{React.version}</h1>
      <h2>NPM package button</h2>
      <LikeButton />
      <h2>Module Federation button</h2>
      <ErrorBoundary>
        <React.Suspense fallback={"Loading..."}>
          <LikeButtonMF />
        </React.Suspense>
      </ErrorBoundary>
    </div>
  );
};

ReactDom.render(<App />, document.querySelector("#app"));
