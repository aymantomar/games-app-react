import React, { useState } from "react";
import "./ResetPassword.module.css";
import logo from "../../assets/image/logo.png";
import imgLogo from "../../assets/image/gaming.ebaf2ffc84f4451d.jpg";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const nav = useNavigate();
  const [error, seterror] = useState();
  const [success, setSuccess] = useState(null);
  async function resetPassword(value) {
    console.log(value);
    let { data } = await axios
      .put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, value)
      .catch((error) => seterror(error.response.data.message));
    console.log(data);
    if (data?.token) {
      setTimeout(() => {
        setSuccess(`Password Change Successfully`);
      }, 2500);
      nav("/login");
    }
  }
  let passWordReg =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  let validationSchema = Yup.object({
    email: Yup.string().email().required("Email is Required"),
    newPassword: Yup.string()
      .matches(
        passWordReg,
        "Minimum eight characters, at least one letter, one number and one special character"
      )
      .required("Password is Required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: resetPassword,
  });
  return (
    <div className="row g-0 mt-3">
      <div className="col-md-6">
        <img src={imgLogo} alt="Gaming" className="w-100" />
      </div>
      <div className="col-md-6 bg-darking p-3 text-center">
        <img src={logo} alt="GameOver Logo" width={140} />
        <h3 className="mb-3">Reset Password in GameOver</h3>
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
            type="password"
            className="form-control mb-3"
            placeholder="New Password"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="newPassword"
          />
          {formik.errors.newPassword && formik.touched.newPassword ? (
            <div className="alert alert-danger">
              {formik.errors.newPassword}
            </div>
          ) : (
            ""
          )}

          <input
            type="submit"
            className="btn btn-dark w-100 p-2"
            value="Reset Password"
          />
        </form>
      </div>
    </div>
  );
}
