import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login"

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Routes>
        <Route index element={<Login/>} />Í
          <Route path="/dashboard" element={<Dashboard />} />Í
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
