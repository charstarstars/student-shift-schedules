import { render } from "react-dom";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { AddReceptionistsPage, ReceptionistsPage } from "./components/Receptionists";

import App from "./App";
import { StudentAvailabilityPage } from "components/StudentAvailability";
import ShiftScheduleView from "components/ShiftScheduleView";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<ShiftScheduleView />} />
        <Route path="receptionists" >
          <Route path=":studentId" element={<StudentAvailabilityPage />} />
          <Route path="add" element={<AddReceptionistsPage />} />
          <Route index element={<ReceptionistsPage />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>,
  rootElement
);
