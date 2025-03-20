import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react"; // ✅ Use Clerk Authentication
import { useUser } from "@clerk/clerk-react"; // ✅ Get User Session
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/Home";
import Products from "./pages/Products";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import AdminPage from "./pages/AdminPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/global.css"; 

// ✅ Protect Admin Routes - Only Logged-in Users Can Access
const ProtectedRoute = ({ children }) => {
  const { isSignedIn, user } = useUser();
  if (!isSignedIn || user.role !== "admin") {
    return <RedirectToSignIn />;
  }
  return children;
};

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />

        {/* ✅ Protect Admin Route - Only Logged-in Users Can Access */}
        <Route
          path="/admin"
          element={
            <SignedIn>
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            </SignedIn>
          }
        />
        
        {/* ✅ Redirect Unauthenticated Users to Sign In */}
        <Route
          path="*"
          element={
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
