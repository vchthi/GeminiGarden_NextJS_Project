"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../globals.css";
import Link from "next/link";
export default function SignUp() {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      repassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please enter username"),
      email: Yup.string()
        .email("Invalid email")
        .required("Please enter email"),
      password: Yup.string()
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
          "Password must be at least 6 characters, including letters and numbers"
        )
        .required("Please enter password"),
      repassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Password incorrect")
        .required("Please re-enter password"),
    }),
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        const res = await fetch("http://localhost:3000/users/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: values.name,
            email: values.email,
            password: values.password,
            repassword: values.repassword,
          }),
        });

        if (!res.ok) {
          const errorData = await res.json();
          if (res.status === 400 && errorData.message === "Email already exists") {
            setFieldError("email", "Email already exists");
            setErrorMessage("Email already exists");
          } else {
            throw new Error(errorData.message || "Registration failed");
          }
        } else {
          // Xử lý thành công
          setSuccessMessage("Sign Up Success");
          setErrorMessage(""); // Xóa lỗi nếu có
        }
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (

      <div className="signup-page">
        <div className="background-signup">
          <div className="signup-form">
            <h1>Sign Up</h1>
            <form action="#" method="post" onSubmit={formik.handleSubmit}
              id="signupForm"
             
            >
              
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" required placeholder="Username"   {...formik.getFieldProps("name")}/>
                {" "}
              {formik.touched.name && formik.errors.name ? (
                <div className="text-danger">{formik.errors.name}</div>
              ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required placeholder="Email"  {...formik.getFieldProps("email")}/>
                {formik.touched.email && formik.errors.email ? (
                <div className="text-danger">{formik.errors.email}</div>
              ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" required placeholder="Password"   {...formik.getFieldProps("password")}/>
                {formik.touched.password && formik.errors.password ? (
                <div className="text-danger">{formik.errors.password}</div>
              ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="repassword">Confirm Password</label>
                <input type="password" id="repassword" name="repassword" required placeholder="Confirm Password"      {...formik.getFieldProps("repassword")} />
                {formik.touched.repassword && formik.errors.repassword ? (
                <div className="text-danger">{formik.errors.repassword}</div>
              ) : null}
               
              </div>
              <button id="btn-account" type="submit">Sign Up</button><div className="form-group"  disabled={formik.isSubmitting}>
              <Link href="/dangnhap"><p id="create-acc">You have an account?</p> </Link></div>
              {successMessage && (
                <div className="text-success">{successMessage}</div>
              )}
              {errorMessage && (
                <div className="text-danger">{errorMessage}</div>
              )}
            </form>
          </div>
          <div className="background-bottom-right">
            <img src="/images/banner-bottom-right.png" alt="" />
          </div>
        </div>
      </div>
 
  );
}

