"use client";
import { useState, ChangeEvent, FormEvent, createContext } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { FormDataType } from "../signup/page";

interface FormData {
  email: string;
  password: string;
}

const Page: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  // const [loggedInUser, setLoggedInUser] = useState<FormDataType | null>(null);

  const router = useRouter();

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
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Registration successful", result.data);
      console.log("user", result.data.user.loggedInUser);

      router.push("/");
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(result.data.user.loggedInUser)
      );
      localStorage.setItem("accessToken", result.data.user.accessToken);
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Page;
