"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface FormData {
  email: string;
  password: string;
}

const Page: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      // const formDataToSend = new FormData();
      // formDataToSend.append("email", formData.email);
      // formDataToSend.append("password", formData.password);
      const result = await axios.post(
        "http://localhost:5000/api/v1/users/login",
        formData
      );
      console.log("Registration successful", result);
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <div className="flex justify-center m-5">
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className=" grid w-full max-w-sm items-center gap-1.5"
      >
        <Input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <br />

        <Input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <br />
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};

export default Page;
