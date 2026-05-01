import { Route, Routes } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import ProducDetails from "./pages/ProducDetails";
import ProtectedRoute from "./components/auth/ProtectedRoute";

import "./index.css";
import ScrollToTop from "./components/common/ScrollToTop";

function App() {
  return (
    <MainLayout>
      <ScrollToTop />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Home />} />

        <Route path="/product/:id" element={<ProducDetails />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
