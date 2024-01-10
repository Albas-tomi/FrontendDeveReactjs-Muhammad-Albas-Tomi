import { Button, Label, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const users = {
    id: 1,
    username: "albas",
    password: "password123",
    email: "albas@gmail.com",
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      if (values.email === users.email && values.password === users.password) {
        localStorage.setItem("userLogin", values.email);
        alert("berhasil login");
        navigate("/");
      } else {
        alert("Email atau Passowrd Salah");
      }
    },
  });
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex mx-auto mt-10 shadow-sm p-5 max-w-md flex-col gap-4"
    >
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email" value="Your Email" />
        </div>
        <TextInput
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          required
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password1" value="Your password" />
        </div>
        <TextInput
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          required
        />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default LoginPage;
