// "use client";
// import { useState, ChangeEvent, FormEvent, createContext } from "react";
// import axios from "axios";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import Cookies from "js-cookie";
// import { useRouter } from "next/navigation";
// import { FormDataType } from "../signup/page";
// import UseAuth from "@/components/UseAuth";

// interface FormData {
//   email: string;
//   password: string;
// }

// const Page: React.FC = () => {
//   const [formData, setFormData] = useState<FormData>({
//     email: "",
//     password: "",
//   });
//   const { setAllowUser } = UseAuth();

//   // const [loggedInUser, setLoggedInUser] = useState<FormDataType | null>(null);

//   const router = useRouter();

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     if (formData.email !== "" && formData.password !== "") {
//       try {
//         // const formDataToSend = new FormData();
//         // formDataToSend.append("email", formData.email);
//         // formDataToSend.append("password", formData.password);
//         const result = await axios.post(
//           "http://localhost:5000/api/v1/users/login",
//           formData,
//           {
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         if (result.data) {
//           window.location.reload();
//           setAllowUser(true);

//           router.push("/");
//           localStorage.setItem(
//             "loggedInUser",
//             JSON.stringify(result.data.user.loggedInUser)
//           );
//           localStorage.setItem("accessToken", result.data.user.accessToken);
//         }
//       } catch (error) {
//         console.error("Error registering user:", error);
//       }
//     } else {
//       alert("please fill the complete form");
//     }
//   };

//   return (
//     <div className="flex justify-center m-5">
//       <form
//         onSubmit={handleSubmit}
//         encType="multipart/form-data"
//         className=" grid w-full max-w-sm items-center gap-1.5"
//       >
//         <Input
//           type="email"
//           name="email"
//           placeholder="Email"
//           onChange={handleChange}
//         />
//         <br />

//         <Input
//           type="password"
//           name="password"
//           placeholder="Password"
//           onChange={handleChange}
//         />
//         <br />
//         <button className="bg-black text-white p-2 " type="submit">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Page;

"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import UseAuth from "@/components/UseAuth";

interface FormData {
  email: string;
  password: string;
}

const Page: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const { setAllowUser } = UseAuth();

  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (formData.email !== "" && formData.password !== "") {
      try {
        const result = await axios.post(
          "http://localhost:5000/api/v1/users/login",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (result.data) {
          setAllowUser(true);
          console.log("result login", result.data);
          router.push("/");
          localStorage.setItem(
            "loggedInUser",
            JSON.stringify(result.data.user.loggedInUser)
          );
          localStorage.setItem("accessToken", result.data.user.accessToken);
        }
      } catch (error) {
        console.error("Error logging in:", error);
      }
    } else {
      alert("Please fill the complete form");
    }
  };

  return (
    <div className="flex justify-center m-5">
      <form
        onSubmit={handleSubmit}
        className="grid w-full max-w-sm items-center gap-1.5"
      >
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <br />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <br />
        <button className="bg-black text-white p-2" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Page;
