import React, { useState } from "react";
import "./VerifyCode.module.css";
import logo from "../../assets/image/logo.png";
import imgLogo from "../../assets/image/gaming.ebaf2ffc84f4451d.jpg";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function VerifyCode() {
  const nav = useNavigate();
  const [error, seterror] = useState();
  const [success, setSuccess] = useState(null);
  async function VerifyCodeApi(value) {
    console.log(value);
    let { data } = await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
        value
      )
      .catch((error) => seterror(error.response.data.message));
    if (data.status === "Success") {
      setTimeout(() => {
        setSuccess(`Verify code is correct`);
      }, 2500);
      nav("/resetPassword");
    }
  }

  let validationSchema = Yup.object({
    resetCode: Yup.number()
      .min(6, "Min Number Must 6 digit")
      .required("Verify Code is Required"),
  });
  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema,
    onSubmit: VerifyCodeApi,
  });
  return (
    <div className="row g-0 mt-3">
      <div className="col-md-6">
        <img src={imgLogo} alt="Gaming" className="w-100" />
      </div>
      <div className="col-md-6 bg-darking p-3 text-center">
        <img src={logo} alt="GameOver Logo" width={140} />
        <h3 className="mb-3">Verify Code GameOver</h3>
        {success ? <div className="alert alert-success">{success}</div> : ""}
        {error ? <div className="alert alert-danger">{error}</div> : ""}
        <form onSubmit={formik.handleSubmit}>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Verify Code"
            value={formik.values.resetCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="resetCode"
          />
          {formik.errors.resetCode && formik.touched.resetCode ? (
            <div className="alert alert-danger">{formik.errors.resetCode}</div>
          ) : (
            ""
          )}
          <input
            type="submit"
            className="btn btn-dark w-100 p-2"
            value="Verify Code"
          />
        </form>
      </div>
    </div>
  );
}
