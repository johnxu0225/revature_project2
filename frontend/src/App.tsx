import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./Components/Navbar/Navbar";
import { Login } from "./Components/Auth/Login";
import { Register } from "./Components/Auth/Register";
import { Personalize } from "./Components/Auth/Personalize";
import { EnvelopeList } from "./Components/Envelopes/EnvelopeList";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/personalize" element={<Personalize />} />
          <Route path="/envelopes" element={<EnvelopeList />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
