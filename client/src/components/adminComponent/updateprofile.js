import { useState, useEffect } from "react";
import "../../Styles/updateProfile.css";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../redux/apiCalls/profileApiCall";
import { Link } from "react-router-dom";

const UpdateProfileComp = ({ setUpdateProfile, profile }) => {
  const dispatch = useDispatch();

  const [adminname, setName] = useState(profile?.adminname);
  const [lastname, setLastname] = useState(profile?.lastname);
  const [bio, setbio] = useState(profile?.bio);
  const [age, setAge] = useState(profile?.age);
  const [address, setAdress] = useState(profile?.address);
  const [phone, setPhone] = useState(profile?.phone);

  useEffect(() => {
    setName(profile?.adminname);
    setLastname(profile?.lastname);
    setbio(profile?.bio);
    setAge(profile?.age);
    setAdress(profile?.address);
    setPhone(profile?.phone);
  }, [
    profile?.adminname,
    profile?.lastname,
    profile?.bio,
    profile?.age,
    profile?.address,
    profile?.phone,
  ]);

  //form submit handler
  const formSubmitHnadler = (e) => {
    e.preventDefault();
    const updatedAdmin = { adminname, lastname, bio, address, phone, age };

    //console.log(updatedAdmin)
    dispatch(updateProfile(profile?._id, updatedAdmin));
  };

  return (
    <div className="update-profile">
      <form onSubmit={formSubmitHnadler} className="update-profile-form">
        <h1 className="update-profile-title">Update your profile </h1>
        <label className=" update-profile-label">First Name </label>
        <input
          type="text"
          name="name"
          id="name"
          className="update-profile-input"
          value={adminname || ""}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <label className=" update-profile-label">Last Name </label>
        <input
          type="text"
          name="lastname"
          id="lastname"
          className="update-profile-input"
          value={lastname || ""}
          onChange={(e) => setLastname(e.target.value)}
        ></input>
        <label className=" update-profile-label">Phone </label>
        <input
          type="text"
          placeholder="+216"
          name="phone"
          id="phone"
          className="update-profile-input"
          value={phone || ""}
          onChange={(e) => setPhone(e.target.value)}
        ></input>

        <label className=" update-profile-label">Age </label>
        <input
          type="text"
          name="age"
          id="age"
          className="update-profile-input"
          value={age || ""}
          onChange={(e) => setAge(e.target.value)}
        ></input>
        <label className=" update-profile-label">Adress </label>
        <input
          type="text"
          name="adresse"
          id="adresse"
          className="update-profile-input"
          value={address || ""}
          onChange={(e) => setAdress(e.target.value)}
        ></input>
        <label className=" update-profile-label">Bio </label>
        <input
          type="textarea"
          name="bio"
          id="bio"
          className="update-profile-input"
          value={bio || ""}
          onChange={(e) => setbio(e.target.value)}
        ></input>

        <Link className="link-pwd" to="/admin/security">
          Click here to update your email or password
        </Link>

        <button
          type="submit"
          className="btn"
          onClick={() => setUpdateProfile(true)}
        >
          {" "}
          Update{" "}
        </button>
      </form>
    </div>
  );
};
export default UpdateProfileComp;
