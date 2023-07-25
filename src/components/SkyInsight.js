import {Route, Routes} from "react-router-dom"
import './SkyInsight.css';
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { Authorized } from "./routes/Authorized";
import { NavBar } from "./header/NavBar";
import { ApplicationRoutes } from "./routes/ApplicationRoutes";
import { Footer } from "./footer/Footer";

export const SkyInsight = () => {
  return <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    <Route path="*" element={
      <Authorized>
        <>
          <NavBar />
          <ApplicationRoutes />
          <Footer />
        </>
      </Authorized>
    } />
  </Routes>
}