import { Route, Routes } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import ProducDetails from "./pages/ProducDetails";
import AdminDashboard from "./pages/AdminDashboard";
import SellerDashboard from "./pages/SellerDashboard";
import Wishlist from "./pages/Wishlist";

import "./index.css";
import ScrollToTop from "./components/common/ScrollToTop";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <MainLayout>
      <ScrollToTop />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProducDetails />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/seller" element={<SellerDashboard />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Route>
      </Routes>
    </MainLayout>
  );
}

export default App;
