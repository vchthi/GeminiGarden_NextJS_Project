"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import "../globals.css";
import Link from "next/link";

export default function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please enter username"),
      password: Yup.string().required("Please enter password"),
    }),
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        const res = await fetch("http://localhost:3000/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || 'Login failed');
        }

        const data = await res.json();
        if (!data.access_token) {
          throw new Error('Token not received');
        }

        document.cookie = `token=${data.access_token}; path=/; max-age=${60 * 60}`;

        if (data.role === 1) {
          router.push('http://localhost:3002');
        } else {
          router.push('/info');
        }
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="login-page">
      <div className="background-login">
        <div className="background-bottom-left">
          <img src="/images/banner-bottom-left.png" alt="" />
        </div>
        <div className="login-form">
          <h1>Login</h1>
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Username</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Username"
                {...formik.getFieldProps("name")}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-danger">{formik.errors.name}</div>
              ) : null}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-danger">{formik.errors.password}</div>
              ) : null}
            </div>

            <button type="submit" id="btn-account" disabled={formik.isSubmitting}>
              {formik.isSubmitting ? "Logging in..." : "Login"}
            </button>

            <div className="form-group">
              <Link href="/dangky">
                <p id="create-acc">Create a new account</p>
              </Link>
            </div>

            {errorMessage && (
              <div className="text-danger">{errorMessage}</div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
