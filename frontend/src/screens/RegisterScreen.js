import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RegisterScreen(props) {
  const [userdetail, setUserDetail] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoad] = useState(false);

  useEffect(() => {
    if (userId) {
      setUserDetail({
        name: "",
        email: "",
        password: "",
      });
      props.history.push("/signin");
    }
  }, [userId]);

  useEffect(() => {
    if (error && error !== "") {
      toast.error(`Error!\n${error}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setError("");
    }
  }, [error]);

  const submitHandler = (e) => {
    setLoad(true);
    e.preventDefault();
    Axios.post("/api/users/register", userdetail)
      .then((response) => {
        setLoad(false);
        setUserId(response.data.response._id);
      })
      .catch((error) => {
        if (error.response) {
          setLoad(false);
          setError(error.response.data.message);
        }
      });
  };
  return (
    <div className="form">
      <div>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
      <form onSubmit={submitHandler}>
        <ul className="form-container">
          <li>
            <h2>Create Account</h2>
          </li>
          <li>{loading ? <div>Loading...</div> : ""}</li>
          <li>
            <label htmlFor="name">Name</label>
            <input
              type="name"
              name="name"
              id="name"
              value={userdetail.name}
              onChange={(e) =>
                setUserDetail({ ...userdetail, name: e.target.value })
              }
            ></input>
          </li>
          <li>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={userdetail.email}
              onChange={(e) =>
                setUserDetail({ ...userdetail, email: e.target.value })
              }
            ></input>
          </li>
          <li>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={userdetail.password}
              onChange={(e) =>
                setUserDetail({ ...userdetail, password: e.target.value })
              }
            ></input>
          </li>
          <li>
            <label htmlFor="rePassword">Re-Enter Password</label>
            <input
              type="password"
              id="rePassword"
              name="rePassword"
              // onChange={(e) => setRePassword(e.target.value)}
            ></input>
          </li>
          <li>
            <button
              type="submit"
              disabled={
                userdetail.name !== "" &&
                userdetail.email !== "" &&
                userdetail.password !== ""
                  ? false
                  : true
              }
              className="button primary"
            >
              Register
            </button>
          </li>
          <li>
            Already have an account?
            <Link to={"/signin"} className="button secondary text-center">
              Sign In
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
}
export default RegisterScreen;
