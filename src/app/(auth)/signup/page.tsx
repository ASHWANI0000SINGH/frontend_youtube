"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export interface FormDataType {
  username: string;
  email: string;
  fullName: string;
  password: string;
  avatar: File | string;
  coverImage: File | string;
}

const Page: React.FC = () => {
  const [formData, setFormData] = useState<FormDataType>({
    username: "",
    email: "",
    fullName: "",
    password: "",
    avatar: "",
    coverImage: "",
  });
  const router = useRouter();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("username", formData.username);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("fullName", formData.fullName);
      formDataToSend.append("password", formData.password);
      if (formData.avatar) {
        formDataToSend.append("avatar", formData.avatar);
      }
      if (formData.coverImage) {
        formDataToSend.append("coverImage", formData.coverImage);
      }

      const result = await axios.post(
        "http://localhost:5000/api/v1/users/register",
        formDataToSend
      );
      if (result.data) {
        router.push("/login");
      }
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
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
        />
        <br />
        <Input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <br />
        <Input
          type="text"
          name="fullName"
          placeholder="Full Name"
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
        <Input type="file" name="avatar" onChange={handleFileChange} />
        <br />
        <Input type="file" name="coverImage" onChange={handleFileChange} />{" "}
        <br />
        <Button type="submit">Register</Button>
      </form>
    </div>
  );
};

export default Page;
