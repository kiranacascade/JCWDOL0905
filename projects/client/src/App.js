import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { api } from "./api/api";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "./redux/userSlice";
import { setBranchId } from "./redux/branchSlice";
import { setAccessToken } from "./redux/tokenSlice";
import { Loading } from "./pages/Loading";
import ProtectedPage from "./component/ProtectedPage";
import LandingPage from "./pages/user/LandingPage";
import Register from "./pages/user/Register";
import Login from "./pages/user/Login";
import VerificationSuccess from "./pages/user/VerificationSuccess";
import ResendEmailVerification from "./pages/user/ResendEmailVerification";
import ForgotPassword from "./pages/user/ForgotPassword";
import ResetPassword from "./pages/user/ResetPassword";
import ResendEmailResetPW from "./pages/user/ResendEmailResetPW"
import VerificationBridge from "./pages/user/VerificationBridge";
import VerificationPasswordBridge from "./pages/user/VerificationPasswordBridge";
import EditProfile from "./pages/user/EditProfile";
import Page404 from "./pages/404"
import ProductsPage from "./pages/user/productsPage";
import CategoryPage from "./pages/user/categoryPage";
import ChangePassword from "./pages/user/ChangePassword";
import TokenInvalid from "./pages/TokenInvalid";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const branchId = localStorage.getItem("branchId");
    dispatch(setBranchId({ branchId: branchId }));
    setTimeout(() => {setIsLoading(false)}, 1000);

    const fetchUser = async (token) => {
      try {
        const res = await api.get(`/users/auth/${token}`);
        dispatch(login(res.data.user));
        dispatch(setAccessToken(token));
      } catch (error) {
        window.location.href = "/token-invalid";
        localStorage.removeItem("token");
      }
    };
    if (token) {
      fetchUser(token);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Toaster />
          <BrowserRouter>
            <Routes>
              <Route element={<ProtectedPage guestOnly={true}><Register /></ProtectedPage>} path="/register" />
              <Route element={<ProtectedPage guestOnly={true}><Login /></ProtectedPage>} path="/login" />
              <Route element={<ProtectedPage guestOnly={true}><VerificationSuccess /></ProtectedPage>} path="/verification-success" />
              <Route element={<ProtectedPage guestOnly={true}><ResendEmailVerification /></ProtectedPage>} path="/resend-verification" />
              <Route element={<ProtectedPage guestOnly={true}><ForgotPassword /></ProtectedPage>} path="/forgot-password" />
              <Route element={<ProtectedPage guestOnly={true}><ResetPassword /></ProtectedPage>} path="/reset-password" />
              <Route element={<ProtectedPage guestOnly={true}><ResendEmailResetPW /></ProtectedPage>} path="/resend-forgot-password" />
              <Route element={<ProtectedPage guestOnly={true}><VerificationBridge /></ProtectedPage>} path="/verify" />
              <Route element={<ProtectedPage guestOnly={true}><VerificationPasswordBridge /></ProtectedPage>} path="/verify-forgot-password" />
              <Route element={<ProtectedPage needLogin={true}><EditProfile /></ProtectedPage>} path="/edit-profile" />
              <Route Component={ProductsPage} path="/product" />
              <Route Component={CategoryPage} path="/category/:id" />
              <Route element={<ProtectedPage needLogin={true}><ChangePassword /></ProtectedPage>}path="/change-password" />
              <Route Component={TokenInvalid} path="/token-invalid" />
              <Route Component={LandingPage} path="/" />
              <Route Component={Page404} path="*" />
            </Routes>
          </BrowserRouter>
        </>
      )}
    </>
  );
}

export default App;
