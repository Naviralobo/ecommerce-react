import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useRegisterMutation } from "../features/auth/authApi";
import type { ApiError } from "../types/api";

const Register = () => {
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const response = await register({
        name,
        email,
        password,
      }).unwrap();

      toast.success(response.message);

      navigate("/login");
    } catch (error) {
      const err = error as ApiError;

      toast.error(err.data?.message ?? "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-(--color-surface) p-6 rounded-xl shadow">
      <h1 className="text-xl font-bold mb-4">Sign Up</h1>

      <input
        type="text"
        placeholder="Name"
        className="w-full mb-3 p-2 border rounded"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        className="w-full mb-3 p-2 border rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full mb-4 p-2 border rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleRegister}
        disabled={isLoading}
        className="w-full bg-(--color-accent) text-white py-2 rounded disabled:opacity-50"
      >
        {isLoading ? "Creating Account..." : "Sign Up"}
      </button>

      <p className="text-sm mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;