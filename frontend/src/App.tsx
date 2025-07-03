import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import Dashboard from "./pages/DashboardPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import CreateTierList from "./pages/CreateTierList.tsx";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<RegisterPage />} />

        <Route path="/createTierList" element={<CreateTierList />} />
      </Routes>
    </Router>
  );
}

export default App;
