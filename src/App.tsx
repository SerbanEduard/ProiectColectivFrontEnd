import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider"
import Signup from "./pages/authentication/Signup";
import ForgotPassword from "./pages/authentication/ForgotPassword";
import ResetPassword from "./pages/authentication/ResetPassword";



function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          {/* Default route */}
          <Route path="/" element={<Navigate to="/signup" replace />} />

          {/* Actual routes */}
          <Route path="/signup" element={<Signup />} />

          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App