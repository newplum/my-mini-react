import React from "./core/React";

const arr = new Array(100000).fill(false);

const dom = arr.map((_, i) => {
  return <div>{i}</div>;
});

const App = <div className="wrapper">{...dom}</div>;

export default App;
