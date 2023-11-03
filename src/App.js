import Button from "./components/Button";
import { useState } from "react";
import LessonPage from "./pages/LessonPage";
import TablePage from "./pages/TablePage";
import HomePage from "./pages/HomePage";
import classnames from "classnames";
import Modal from "./components/Modal";
import SideNav from "./components/SideNav";
import Route from "./components/Route";
import Header from "./components/Header";


function App() {

  return (
    <div className="relative">
      <Header />
      <div className="mt-1 mx-auto grid grid-cols-6 gap-4" style={{ "backgroundColor": "#f6f8fa"}}>
        <div className="col-span-1">
          <SideNav />
        </div>
        <div className="col-span-5 mt-1">
          <Route path="/">
            <HomePage />
          </Route>
          <Route path="/table">
            <TablePage />
          </Route>
          <Route path="/lesson">
            <LessonPage />
          </Route>
        </div>
      </div>
    </div>
  );
}

export default App;
