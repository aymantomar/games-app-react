import React, { useState } from "react";
import "./Register.module.css";
import imgLogo from "../../assets/image/gaming.ebaf2ffc84f4451d.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

export default function Register() {
  const nav = useNavigate();
  const [error, seterror] = useState();
  let passWordReg =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  let phoneReg = /^01[0125][0-9]{8}$/gi;
  async function Register(value) {
    console.log(value);
    let { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", value)
      .catch((error) => {
        seterror(error.response.data.message);
      });
    // console.log(data);
    // console.log(data?.response.data);
    if (data.message === "success") {
      nav("/login");
    }
  }
  let validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Min Length 3 Characters")
      .max(15, "Max Length 15 Characters")
      .required("Name is Required"),
    email: Yup.string().email().required("Email is Required"),
    password: Yup.string()
      .matches(
        passWordReg,
        "Minimum eight characters, at least one letter, one number and one special character"
      )
      .required("Password is Required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Repassword Must be matches with password")
      .required("Repassword is Required"),
    phone: Yup.string().matches(phoneReg).required("Phone is Required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: Register,
  });
  return (
    <div>
      <div className="row g-0 mt-3">
        <div className="col-md-6">
          <img src={imgLogo} alt="Gaming" className="w-100" />
        </div>
        <div className="col-md-6 bg-darking p-2 text-center">
          {error ? <div className="alert alert-danger">{error}</div> : ""}
          <h3 className="mb-2">Create My Account!</h3>
          <form onSubmit={formik.handleSubmit}>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="name"
            />
            {formik.errors.name && formik.touched.name ? (
              <div className="alert alert-danger">{formik.errors.name}</div>
            ) : (
              ""
            )}
            <input
              type="email"
              className="form-control mb-2"
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
              className="form-control mb-2"
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
              type="password"
              className="form-control mb-2"
              placeholder="Repassword"
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="rePassword"
            />
            {formik.errors.rePassword && formik.touched.rePassword ? (
              <div className="alert alert-danger">
                {formik.errors.rePassword}
              </div>
            ) : (
              ""
            )}
            <input
              type="tel"
              className="form-control mb-2"
              placeholder="Phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="phone"
            />
            {formik.errors.phone && formik.touched.phone ? (
              <div className="alert alert-danger">{formik.errors.phone}</div>
            ) : (
              ""
            )}
            <input
              type="submit"
              className="btn btn-dark w-100 p-2"
              value="Create Account"
            />
          </form>
          <p style={{ fontSize: "12px", marginTop: "12px" }}>
            this site is protected by reCAPTCHA and the GooglePrivacy Policy and
            Tres of Service apply. <br />
            Already a member? <br /> <Link to={"/login"}>Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
