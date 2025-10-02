import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Layout from "./Pages/Layout";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import DashLayout from "./Dashboard/DashLayout";
import Dashboard from "./Dashboard/Dashboard";
import Expense from "./Dashboard/Expense";
import Profile from "./Dashboard/Profile";
import Income from "./Dashboard/Income";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>

        <Route path="/dashboard" element={<DashLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="expense" element={<Expense />} />
          <Route path="profile" element={<Profile />} />
          <Route path="income" element={<Income />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
