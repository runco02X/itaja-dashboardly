
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="itaja-ui-theme">
      <Router>
        <Routes>
          <Route path="/" element={<Checkout />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
        <Toaster />
      </Router>
    </ThemeProvider>
  );
}

export default App;
