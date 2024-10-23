import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { Formik } from "formik";
import * as Yup from "yup";

const Login = ({ onLogin }) => {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("Invalid email address")
          .required("Email is required"),
        password: Yup.string()
          .required("Password is required")
          .min(6, "Password must be at least 6 characters long")
          .matches(/(?=.*[0-9])/, "Password must contain at least one number")
      })}
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        try {
          const result = await axios.post('http://localhost:3888/api/login', values);
          
          // Cek apakah ada token di respons
          if (result.data && result.data.token) {
            sessionStorage.setItem('token', result.data.token);
            onLogin(); // Jika login berhasil, panggil fungsi onLogin
          } else {
            // Jika respons dari server tidak ada token, tampilkan pesan error
            setErrors({ server: "Invalid user credentials. Please register first." });
          }
        } catch (error) {
          console.error('Login failed:', error.response ? error.response.data : error.message);
          
          // Tampilkan error jika login gagal
          setErrors({ server: error.response?.data?.message || "Login failed, please check your credentials." });
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting
      }) => (
        <div className='w-screen h-screen bg-[#BDE0FE] flex flex-col items-center justify-center'>
          <div className='w-[80%] bg-white h-auto shadow-2xl mt-5 rounded-lg pb-4'>
            <h1 className='mt-10 text-center font-bold text-xl mb-5 text-[#9ec8ec]'>Login Page</h1>
            <form className='px-5 flex flex-col gap-5' onSubmit={handleSubmit}>
              
              {/* Email field */}
              <span className='flex flex-col gap-1 mt-5'>
                <label htmlFor="email" className='text-[#7a9dbd]'>Email</label>
                <input
                  className='border py-2 rounded-md px-2 focus:outline-none focus:ring-2'
                  id='email'
                  type="email"
                  placeholder='Enter your email'
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.email && errors.email ? (
                  <div className="text-red-500 text-sm">{errors.email}</div>
                ) : null}
              </span>

              {/* Password field */}
              <span className='flex flex-col gap-1'>
                <label htmlFor="password" className='text-[#7a9dbd]'>Password</label>
                <input
                  className='border py-2 rounded-md px-2 focus:outline-none focus:ring-2'
                  id='password'
                  type="password"
                  placeholder='Enter your password'
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.password && errors.password ? (
                  <div className="text-red-500 text-sm">{errors.password}</div>
                ) : null}
              </span>

              {/* Server-side error */}
              {errors.server && (
                <div className="text-red-500 text-sm">
                  {errors.server}
                </div>
              )}

              {/* Submit button */}
              <button
                className='bg-[#9ec8ec] text-white px-5 py-2 mt-3 rounded-md'
                type='submit'
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>

              <p className='text-[10px] text-end -mt-3'>
                Don't have an account? <Link to={'/register'} className='text-[#7a9dbd]'>Register</Link> page
              </p>
            </form>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default Login;
