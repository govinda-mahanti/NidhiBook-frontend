import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config/urlconfig";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profession: "",
    annualIncome: "",
    monthlyBudget: "",
    yearlyBudget: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/auth/signup`, formData);

      console.log("Signup response:", res.data);
      const { token, ...user } = res.data;

      dispatch(setCredentials({ user, token }));
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="w-full px-4 py-2 border rounded-md"
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className="w-full px-4 py-2 border rounded-md"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
          className="w-full px-4 py-2 border rounded-md"
        />

        <input
          type="text"
          name="profession"
          placeholder="Profession"
          value={formData.profession}
          onChange={(e) =>
            setFormData({ ...formData, profession: e.target.value })
          }
          required
          className="w-full px-4 py-2 border rounded-md"
        />

        <input
          type="number"
          name="annualIncome"
          placeholder="Annual Income"
          value={formData.annualIncome}
          onChange={(e) =>
            setFormData({ ...formData, annualIncome: e.target.value })
          }
          required
          className="w-full px-4 py-2 border rounded-md"
        />

        <input
          type="number"
          name="monthlyBudget"
          placeholder="Monthly Budget"
          value={formData.monthlyBudget}
          onChange={(e) =>
            setFormData({ ...formData, monthlyBudget: e.target.value })
          }
          required
          className="w-full px-4 py-2 border rounded-md"
        />

        <input
          type="number"
          name="yearlyBudget"
          placeholder="Yearly Budget"
          value={formData.yearlyBudget}
          onChange={(e) =>
            setFormData({ ...formData, yearlyBudget: e.target.value })
          }
          required
          className="w-full px-4 py-2 border rounded-md"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
