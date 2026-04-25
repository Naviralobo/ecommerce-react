import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const signup = useAuthStore((state) => state.signup);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    const error = signup(email, password);

    if (error) {
      toast.error(error);
      return;
    }

    toast.success("Account created");
    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-(--color-surface) p-6 rounded-xl shadow">
      <h1 className="text-xl font-bold mb-4">Sign Up</h1>

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
        onClick={handleSignup}
        className="w-full bg-(--color-accent) text-white py-2 rounded"
      >
        Sign Up
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
