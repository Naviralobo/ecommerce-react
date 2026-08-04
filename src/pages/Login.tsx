import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useLoginMutation } from "../features/auth/authApi";
import { useAppDispatch } from "../hooks/redux";
import { setCredentials } from "../features/auth/authSlice";
import type { ApiError } from "../types/api";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await login({
        email,
        password,
      }).unwrap();

      dispatch(setCredentials(response.data));

      toast.success(response.message);

      navigate("/");
    } catch (error) {
      const err = error as ApiError;
      toast.error(err?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-(--color-surface) p-6 rounded-xl shadow">
      <h1 className="text-xl font-bold mb-4">Login</h1>

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
        disabled={isLoading}
        onClick={handleLogin}
        className="w-full bg-(--color-accent) text-white py-2 rounded"
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>

      <p className="text-sm mt-4">
        Don’t have an account?{" "}
        <Link to="/register" className="text-blue-500">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default Login;
