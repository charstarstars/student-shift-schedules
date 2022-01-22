import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Receptionists } from "./Receptionists";

import App from "./App";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/receptionists">
          <Route path=":studentId" />
          <Route index element={<Receptionists />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>,
  rootElement
);
