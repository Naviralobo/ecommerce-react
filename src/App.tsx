import { Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import ProducDetails from "./pages/ProducDetails";
import Cart from "./pages/Cart";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProducDetails />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
