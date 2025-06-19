import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import "./App.css";

function App() {
  return (
    <Router>
      <Route path="/">
        <LoginPage />
      </Route>

      <Route path="/register">
        <RegisterPage />
      </Route>

      <Route path="/dashboard">
        <Dashboard />
      </Route>
    </Router>
  );
}

export default App;
