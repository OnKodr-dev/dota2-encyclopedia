// src/App.jsx
import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout.jsx";
import HeroesPage from "./pages/HeroesPage.jsx";
import HeroDetailPage from "./pages/HeroDetailPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate to="/heroes" replace />} />
        <Route path="/heroes" element={<HeroesPage />} />
        <Route path="/heroes/:slug" element={<HeroDetailPage />} />
        <Route path="*" element={<Navigate to="/heroes" replace />} />
      </Route>
    </Routes>
  );
}
