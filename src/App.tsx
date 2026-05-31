import { Route, Routes } from "react-router-dom";

import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { HomePage } from "@/routes/HomePage";

export default function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </ThemeProvider>
  );
}
