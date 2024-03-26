import React from "./core/React";
import App from "./App";

console.log(App);

console.time("time");

React.render(App, document.querySelector("#app"));

console.timeEnd("time");

