import React, { useState } from "react";
import "./Forget.module.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/image/logo.png";
import imgLogo from "../../assets/image/gaming.ebaf2ffc84f4451d.jpg";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

export default function ForgetPassword() {
  const nav = useNavigate();
  const [error, seterror] = useState();
  const [success, setSuccess] = useState(null);
  async function forgetPassword(value) {
    console.log(value);
    let { data } = await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        value
      )
      .then((res) =>
        setTimeout(() => {
          setSuccess(res.data.message);
          // console.log(res.data);
          if (res.data.statusMsg === "success") {
            nav("/verifyCode");
          }
        }, 2000)
      )
      .catch((error) => {
        seterror(error.response.data.message);
      });
  }
  let validationSchema = Yup.object({
    email: Yup.string().email().required("Email is Required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: forgetPassword,
  });
  return (
    <div className="row g-0 mt-3">
      <div className="col-md-6">
        <img src={imgLogo} alt="Gaming" className="w-100" />
      </div>
      <div className="col-md-6 bg-darking p-3 text-center">
        <img src={logo} alt="GameOver Logo" width={140} />
        <h3 className="mb-3">Forget Password GameOver</h3>
        {success ? <div className="alert alert-success">{success}</div> : ""}
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
            type="submit"
            className="btn btn-dark w-100 p-2"
            value="Forget Password"
          />
        </form>
      </div>
    </div>
  );
}
