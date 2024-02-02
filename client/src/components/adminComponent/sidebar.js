import { logoutAdmin } from "../../redux/apiCalls/authApiCalls";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "../../Styles/sidebar.css";
import KitesurfingOutlinedIcon from "@mui/icons-material/KitesurfingOutlined";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import CategoryIcon from "@mui/icons-material/Category";
import LocalAirportIcon from "@mui/icons-material/LocalAirport";
import DashboardIcon from "@mui/icons-material/Dashboard";
const Sidebar = () => {
  const [navCollapse, setNavCollapse] = useState(false);
  const [smallnavCollapse, setSmallNavCollapse] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  //logout
  const logout = () => {
    dispatch(logoutAdmin());
    navigate("/admin/adminlogin");
  };
  return (
    <div>
      <i
        className="bi bi-justify drawer  smallDivice"
        onClick={(e) => setSmallNavCollapse(!smallnavCollapse)}
      ></i>
      <div
        className={` ${smallnavCollapse ? "smallnavCollaps" : ""} sidebar ${
          navCollapse ? "navCollaps" : ""
        }`}
      >
        <header>
          <div className="image-text">
            <span className="image">
              <img
                src="https://res-console.cloudinary.com/dxzlm2qqz/thumbnails/v1/image/upload/v1684355841/dWE5NmFtb2Jjbm5pbDJ3amtqamg=/preview"
                alt="logo"
                className="logo-sidebar"
              />
            </span>
            <i
              className="bi bi-caret-right-fill toggle largeDivise"
              onClick={(e) => setNavCollapse(!navCollapse)}
            ></i>

            <div className="title-logo">TuniTour</div>
          </div>
        </header>
        <div className="menu-bar">
          <div className="menu">
            <ul className="dashbord-list">
              <Link to="/admin/adminProfile" className="sidebar-link">
                <i className="bi bi-person-badge"></i>
                <span className="nav-text">AdminPorfile</span>
              </Link>

              <Link to="/admin/Endroitpage" className="sidebar-link">
                <i className="bi bi-geo-alt-fill"></i>
                <span className="nav-text">Places</span>
              </Link>
              <Link className="sidebar-link" to="/admin/cities">
                <LocationCityIcon className="sideLInk" />
                <span className="nav-text">Cities</span>
              </Link>
              <Link to="/admin/Category" className="sidebar-link">
                <CategoryIcon className="sideLInk" />
                <span className="nav-text">Categories</span>
              </Link>

              <Link to="/admin/activites" className="sidebar-link">
                <KitesurfingOutlinedIcon className="sideLInk"/>
                <span className="nav-text">Activities</span>
              </Link>
              <Link to="/admin/agency" className="sidebar-link">
                <LocalAirportIcon className="sideLInk" />
                <span className="nav-text"> Agency</span>
              </Link>
              <Link to="/admin/security" className="sidebar-link">
                <i className="bi bi-lock-fill"></i>
                <span className="nav-text">Security</span>
              </Link>
              <a
                href="http://localhost:5601/goto/d3a3c5c0-119c-11ee-894a-4bc840bcb130"
                className="sidebar-link">
                <DashboardIcon className="sideLInk" />
                <span className="nav-text">Dashbord</span>
              </a>
              <Link onClick={logout} className="sidebar-link">
                <i className="bi bi-box-arrow-right"></i>
                <span className="nav-text">Logout</span>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
