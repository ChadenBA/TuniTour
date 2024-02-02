import Home from "./pages/userPages/Home"
import ActivitiesUser from "./pages/userPages/Activities"
import CitiesUser from "./pages/userPages/Cities"
import SignUp from "./pages/userPages/SignUp"
import SignIn from './pages/userPages/SignIn';
import NavBar from './components/userComponent/NavBar';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Profile from "./pages/userPages/Profile"
import NotFound from "./pages/userPages/NotFound"
import ForgetPassword from "./components/userComponent/ForgetPassword"
import ResetPassword from "./components/userComponent/ResetPassword"
import EditProfile from "./components/userComponent/EditProfile"
import City from "./pages/userPages/City"
import SearchBar from "./components/userComponent/SearchBar"
import Place from "./pages/userPages/Place"
import Security from "./components/userComponent/Security"
import { useEffect } from "react";
import ForgotPwd from './pages/adminPages/forgetPass'
import Resetpwd from "./pages/adminPages/resetpwd"
import EndroitCard from "./components/adminComponent/endroit"
import Updatepass from "./components/adminComponent/updatePassword"
import EndroitPage from "./pages/adminPages/EndroitsPage"
import Category from "./pages/adminPages/categoryPage"
import Agency from "./pages/adminPages/agencies"
import { useSelector } from "react-redux"
import Activity from "./pages/userPages/Activity";
import AdminProfile from "./pages/adminPages/Adminprofile";
import Login from "./pages/adminPages/adminlogin"
import Activities from "./pages/adminPages/Activities"
import Cities from "./pages/adminPages/Cities"
import Places from "./pages/userPages/Places";
import Map from "./pages/userPages/Map";

function App() {

  const { admin } = useSelector((state) => state.auth)
  const { value } = useSelector(state => state.login)
  useEffect(() => {
    // Définir la taille de la fenêtre du navigateur au montage du composant
    window.resizeTo(800, 600);

    // Nettoyer la taille de la fenêtre du navigateur lors du démontage du composant
    return () => {
      window.resizeTo(window.innerWidth, window.innerHeight);
    };
  }, []);
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/activites' element={<ActivitiesUser />} />
          <Route path='/activites/:id' element={<Activity />} />
          <Route path='/cities' element={<CitiesUser />} />
          <Route path="/cities/:id" element={<City />} />
          <Route path="/places/:id" element={<Place />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path="/signin/forgetpassword" element={<ForgetPassword />} />
          <Route path="/resetpassword/:id/:token" element={<ResetPassword />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/profile' element={value ? <Profile /> : <Navigate to="/" />} />
          <Route path="/places" element={<Places />} />
          <Route path='/profile/edit-profile' exact element={<EditProfile />} />
          <Route path='/profile/security' exact element={<Security />} />
          <Route path='/admin/security' exact element={<Updatepass />} />

          {/* adminRoute */}
          <Route path="/admin/adminlogin" exact element={!admin ? <Login /> : <Navigate to="/admin/adminProfile" />} />
          <Route path='/admin/forgotpwd' exact element={<ForgotPwd />} />
          <Route path='/admin/resetpwd/:adminId/:token' exact element={<Resetpwd />} />
          <Route path='/admin/activites' element={admin ? <Activities /> : <Navigate to="/admin/adminlogin" />} />
          <Route path='/admin/cities' element={admin ? <Cities /> : <Navigate to="/admin/adminlogin" />} />
          <Route path="/admin/adminProfile" exact element={admin ? <AdminProfile /> : <Navigate to="/admin/adminlogin" />} />
          <Route path="/admin/location" exact element={admin ? <EndroitCard /> : <Navigate to="/admin/adminlogin" />} />
          {/* <Route path="/admin/createEndroit" exact element={admin ?<CreateEndroit/>: <Navigate to="/admin/adminlogin"/>} /> */}
          <Route path="/admin/EndroitPage" exact element={admin ? <EndroitPage /> : <Navigate to="/admin/adminlogin" />} />
          <Route path="/admin/Category" exact element={admin ? <Category /> : <Navigate to="/admin/adminlogin" />} />
          <Route path="/admin/agency" exact element={admin ? <Agency /> : <Navigate to="/admin/adminlogin" />} />

          <Route path="/map" element={<Map />} />
          <Route path='/search' element={<SearchBar />} />
          <Route path='/*' element={<NotFound />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
