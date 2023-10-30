import React, { useContext, useState } from "react";
import "./Login.module.css";
import imgLogo from "../../assets/image/gaming.ebaf2ffc84f4451d.jpg";
import logo from "../../assets/image/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { userContext } from "../../context/userContext";

export default function Login() {
  let { setusertoken } = useContext(userContext);
  const nav = useNavigate();
  const [error, seterror] = useState();
  async function login(value) {
    console.log(value);
    let { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", value)
      .catch((error) => {
        seterror(error.response.data.message);
      });
    // console.log(data);
    // console.log(data?.response.data);
    if (data.message === "success") {
      setusertoken(data.token);
      localStorage.setItem("userToken", data.token);
      nav("/");
    }
  }
  let passWordReg =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  let validationSchema = Yup.object({
    email: Yup.string().email().required("Email is Required"),
    password: Yup.string()
      .matches(
        passWordReg,
        "Minimum eight characters, at least one letter, one number and one special character"
      )
      .required("Password is Required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: login,
  });
  return (
    <div className="row g-0 mt-3">
      <div className="col-md-6">
        <img src={imgLogo} alt="Gaming" className="w-100" />
      </div>
      <div className="col-md-6 bg-darking p-3 text-center">
        <img src={logo} alt="GameOver Logo" width={140} />
        <h3 className="mb-3">Log in to GameOver</h3>
        {error ? <div className="alert alert-danger">{error}</div> : ""}
        <form onSubmit={formik.handleSubmit}>
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="email"
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger">{formik.errors.email}</div>
          ) : (
            ""
          )}
          <input
            type="password"
            className="form-control mb-3"
            placeholder="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="password"
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="alert alert-danger">{formik.errors.password}</div>
          ) : (
            ""
          )}
          <input
            type="submit"
            className="btn btn-dark w-100 p-2"
            value="Login"
          />
        </form>
        <hr className="bg-primary" />
        <p>
          <Link
            className="pb-2 d-block text-decoration-none text-primary"
            to={"/forgetpassword"}
          >
            Forget Password
          </Link>
          Not a member yet? <Link to={"/register"}>Create Account</Link>
        </p>
      </div>
    </div>
  );
}
