import React from "react"
import {RecoilRoot} from 'recoil'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Sendmoney from "./pages/Sendmoney";
function App() {

  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<Sendmoney />} />

        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  )
}

export default App
