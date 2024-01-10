import { Route, Routes } from "react-router-dom";
import HomePage from "./components/Pages/HomePage";
import DetailPage from "./components/Pages/DetailPage";
import NavigationBar from "./components/NavBar/NavigationBar";
import LoginPage from "./components/Pages/LoginPage";

function App() {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/restaurants/:id" element={<DetailPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
