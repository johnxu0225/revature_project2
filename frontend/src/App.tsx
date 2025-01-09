import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./Components/Navbar/Navbar";
import { Login } from "./Components/Auth/Login";
import { Register } from "./Components/Auth/Register";
import { DetailedEnvelope } from "./Components/DetailedEnvelope/DetailedEnvelope";
import { Personalize } from "./Components/Auth/Personalize";
import { AddMoney } from "./Components/AddMoney/AddMoney";
import { EnvelopeList } from "./Components/Envelopes/EnvelopeList";
import { useEffect } from "react";
import SeeUsers from "./Components/SeeUsers/SeeUsers";

function App() {
  // Login on page refresh
  useEffect(() => {

		let token = localStorage.getItem("gooderBudgetToken");
		if (token === null) token = "";
    if (token !== "") {
      // Do stuff here later
      console.log(token);
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/personalize" element={<Personalize />} />
          <Route path="/envelopes" element={<EnvelopeList />} />
          <Route path="/en" element={<DetailedEnvelope />} />
          <Route path="/add" element={<AddMoney />} />
          <Route path="/users" element={<SeeUsers />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
