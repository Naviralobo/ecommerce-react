import { Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import ProducDetails from "./pages/ProducDetails";
import Cart from "./pages/Cart";
import MainLayout from "./components/layout/MainLayout";

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProducDetails />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
