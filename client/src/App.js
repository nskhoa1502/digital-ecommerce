import React from "react";
import { Route, Routes } from "react-router-dom";
import path from "./utils/path";
import { Login, Public, Home } from "./pages/public";

function App() {
  return (
    <div className="min-h-screen bg-gray-300 font-main">
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route index path={path.HOME} element={<Home />} />
          <Route path={path.LOGIN} element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
