"use client";
import React, { useState } from "react";
type signuptype = {
  username: string;
  email: string;
  fullName: string;
  password: string;
  coverImage?: string; // Optional property
  avatar?: string; // Optional property
};

const Signup = () => {
  const [user, setUser] = useState<signuptype>({
    username: "",
    email: "",
    fullName: "",
    password: "",
    coverImage: "",
    avatar: "",
  });
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(typeof value);
    setUser((prev) => ({ ...prev, [name]: value }));

    console.log(name, value);
  };
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const result = await fetch(
        "http://localhost:5000/api/v1/users/register",
        {
          method: "POST",
          body: JSON.stringify(user),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const data = await result.json();
      console.log("data", data);
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <>
      <div className="text-center">
        <form action="" onSubmit={submitHandler}>
          <input
            type="text"
            name="username"
            id=""
            placeholder="username"
            onChange={changeHandler}
          />
          <br />
          <input
            type="email"
            name="email"
            id=""
            placeholder="email"
            onChange={changeHandler}
          />
          <br />
          <input
            type="text"
            name="fullName"
            id=""
            placeholder="fullName"
            onChange={changeHandler}
          />
          <br />
          <input
            type="password"
            name="password"
            id=""
            placeholder="password"
            onChange={changeHandler}
          />
          <br />
          <input
            type="file"
            name="avatar"
            id=""
            placeholder="avatar"
            onChange={changeHandler}
          />
          <br />
          <input
            type="file"
            name="coverImage"
            id=""
            placeholder="coverImage"
            onChange={changeHandler}
          />
          <br />
          <input type="submit" value="Signup" onChange={changeHandler} />
        </form>
      </div>
    </>
  );
};

export default Signup;
