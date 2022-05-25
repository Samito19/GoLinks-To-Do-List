import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";


import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  return (
    <div className="app-container">
      <Dashboard/>
    </div>
  );
}

export default App;
