import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const error = login(email, password);

    if (error) {
      toast.error(error);
      return;
    }

    toast.success("Logged in successfully");
    navigate("/");
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
        onClick={handleLogin}
        className="w-full bg-(--color-accent) text-white py-2 rounded"
      >
        Login
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
