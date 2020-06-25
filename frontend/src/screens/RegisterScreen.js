import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

function RegisterScreen(props) {
  console.log("register props", props);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [userId, setUserId] = useState("");
  console.log("userInfo::::", userId);
  useEffect(() => {
    if (userId) {
      console.log("get user Id");
      props.history.push("/signin");
    }
  }, [userId]);

  const submitHandler = (e) => {
    e.preventDefault();

    // async function fetchData() {
    //   try {
    //     const { data } = await Axios.post("/api/users/register", {
    //       name,
    //       email,
    //       password,
    //     });
    //   } catch (error) {
    //     console.log("error:::", error);
    //   }
    // }
    // fetchData();
    Axios.post("/api/users/register", {
      name,
      email,
      password,
    })
      .then((response) => {
        // Success
        setUserId(response.data.response._id);
        console.log(response);
      })
      .catch((error) => {
        console.log("datamesssage", error.message);
        // Error
        if (error.response) {
          console.log("1data", error.response.data);
          console.log("1status", error.response.status);
          console.log("1headers", error.response.headers);
        }
      });
  };
  return (
    <div className="form">
      <form onSubmit={submitHandler}>
        <ul className="form-container">
          <li>
            <h2>Create Account</h2>
          </li>
          {/* <li>
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
          </li> */}
          <li>
            <label htmlFor="name">Name</label>
            <input
              type="name"
              name="name"
              id="name"
              onChange={(e) => setName(e.target.value)}
            ></input>
          </li>
          <li>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </li>
          <li>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </li>
          <li>
            <label htmlFor="rePassword">Re-Enter Password</label>
            <input
              type="password"
              id="rePassword"
              name="rePassword"
              onChange={(e) => setRePassword(e.target.value)}
            ></input>
          </li>
          <li>
            <button type="submit" className="button primary">
              Register
            </button>
          </li>
          <li>
            Already have an account?
            <Link to={"/signin"} className="button secondary text-center">
              Create your amazona account
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
}
export default RegisterScreen;
