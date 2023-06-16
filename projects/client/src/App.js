import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import { api } from "./api/api";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "./redux/userSlice";
import { setBranchId } from "./redux/branchSlice";
import ProductsPage from "./pages/user/productsPage";
import CategoryPage from "./pages/user/categoryPage";
import { Loading } from "./pages/Loading";
import { ManageCategory } from "./pages/admin/ManageCategory";


function App() {
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(()=>{
    const token = localStorage.getItem("token")
    const branchId = localStorage.getItem("branchId")

    dispatch(
      setBranchId({
        branchId: branchId,
      })
    );

    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    
    const fetchUser = async (token) => {
      await api.get(`/users/auth/${token}`).then((res)=>{
      dispatch(login(res.data.user))
      })
    }
    fetchUser(token)

  },[])

  return (
    <>{isLoading ? <Loading /> : 
    <BrowserRouter>
      <Routes>
        <Route Component={Register} path="/register" />
        <Route Component={Login} path="/login" />
        <Route Component={VerificationSuccess} path="/verification-success" />
        <Route Component={ResendEmailVerification} path="/resend-verification" />
        <Route Component={ForgotPassword} path="/forgot-password" />
        <Route Component={ResetPassword} path="/reset-password" />
        <Route Component={ResendEmailResetPW} path="/resend-forgot-password" />
        <Route Component={VerificationBridge} path="/verify" />
        <Route Component={VerificationPasswordBridge} path="/verify-forgot-password"/>
        <Route Component={LandingPage} path="/" />
        <Route Component={EditProfile} path="/edit-profile" />
        <Route Component={ProductsPage} path="/product" />
        <Route Component={CategoryPage} path="/category/:id" />
        <Route Component={ManageCategory} path="/manage-category" />
      </Routes>
    </BrowserRouter>
    } 
    </>
  );
}

export default App;
