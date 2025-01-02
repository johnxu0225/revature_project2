import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Navbar } from "./Components/Navbar/Navbar";
import { Login } from "./Components/Auth/Login";
import { Register } from "./Components/Auth/Register";
import { Personalize } from "./Components/Auth/Personalize";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/personalize" element={<Personalize />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
