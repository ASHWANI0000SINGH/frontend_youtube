// "use client";
// import React, { useContext, useEffect, useState } from "react";
// import { Button, buttonVariants } from "../ui/button";
// import MenuIcon from "@mui/icons-material/Menu";
// import SettingsVoiceIcon from "@mui/icons-material/SettingsVoice";
// import EmergencyRecordingIcon from "@mui/icons-material/EmergencyRecording";
// import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
// import Face6Icon from "@mui/icons-material/Face6";
// import styles from "./Navbar.module.css";
// import { useRouter } from "next/navigation";
// import { FormDataType } from "@/app/(auth)/signup/page";
// import { UserContext } from "@/app/provider";
// import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
// import LogoutIcon from "@mui/icons-material/Logout";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import axios from "axios";
// import Link from "next/link";
// import UseAuth from "../UseAuth";

// const Navbar = () => {
//   const [showBottomProfile, setShowBottomProfile] = useState(false);
//   const router = useRouter();
//   const loggedInUser = useContext(UserContext);
//   const { allowuser, setAllowUser } = UseAuth();
//   console.log("allow user from nav", allowuser);
//   useEffect(() => {
//     setAllowUser(true);
//   }, []);

//   const gotoProfile = () => {
//     console.log("got to clicked");
//     router.push("/userprofile");
//   };
//   const gotTovideopage = () => {
//     router.push("/videoupload");
//   };
//   const logoutHandler = async () => {
//     console.log("looguy checking..");
//     try {
//       const result = await axios.post(
//         "http://localhost:5000/api/v1/users/logout",
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//           },
//         }
//       );
//       if (result.data) {
//         localStorage.clear();
//         setAllowUser(false);
//         router.push("/login");
//         alert("Logged out ");
//       }
//       console.log("Logeged out", result.data);
//     } catch (error) {
//       console.error("Error While logging out:", error);
//     }
//   };

//   return (
//     <>
//       {!loggedInUser !== null && (
//         <div className="flex flex-col w-full sticky top-0 z-50 ">
//           <div className="w-full h-20 bg-white flex justify-between items-center px-5 sticky top-0 z-50">
//             <div className="flex justify-evenly gap-3">
//               <h1>
//                 <MenuIcon />
//               </h1>
//               <h2>Logo</h2>
//             </div>
//             <div className="flex justify-evenly gap-3">
//               <input
//                 type="text"
//                 name=""
//                 id=""
//                 placeholder="Search"
//                 className=" border border-black  rounded-r-full rounded-l-full w-96 h-8  p-2"
//               />
//               <h2>
//                 <SettingsVoiceIcon />
//               </h2>
//             </div>
//             {allowuser ? (
//               <>
//                 <div className="flex justify-evenly gap-3">
//                   <div className="cursor-pointer">
//                     <EmergencyRecordingIcon onClick={gotTovideopage} />
//                   </div>
//                   <div>
//                     <NotificationsNoneIcon />
//                   </div>
//                   <div className="cursor-pointer  w-10">
//                     {/* eslint-disable-next-line @next/next/no-img-element */}
//                     <img
//                       src={loggedInUser?.avatar}
//                       alt=""
//                       className=" w-6 h-6 rounded-full  "
//                       // onClick={gotoProfile}
//                       onClick={() => setShowBottomProfile(!showBottomProfile)}
//                     />
//                     {showBottomProfile && (
//                       <div className="absolute  ml-2 ">
//                         <div className="text-sm  relative p-1  ">
//                           <AccountCircleIcon
//                             className="text-lg"
//                             onClick={gotoProfile}
//                           />
//                         </div>
//                         <div className="text-sm  p-1 ">
//                           <LogoutIcon onClick={logoutHandler} />
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </>
//             ) : (
//               <>
//                 <Link
//                   href="/login"
//                   className={buttonVariants({ variant: "outline" })}
//                 >
//                   Login
//                 </Link>
//               </>
//             )}
//           </div>
//           {/* <div className="flex flex-col   ">
//           <div className={`${styles.navbar_box} flex justify-center gap-10 `}>
//             <button
//               className={`${styles.navbar_title} border m-2 p-1 rounded text-md font-medium`}
//             >
//               All
//             </button>
//             <button
//               className={`${styles.navbar_title} border m-2 p-1 rounded text-md font-medium`}
//             >
//               News
//             </button>
//             <button
//               className={`${styles.navbar_title} border m-2 p-1 rounded text-md font-medium`}
//             >
//               Computer Programming
//             </button>

//             <button
//               className={`${styles.navbar_title} border m-2 p-1 rounded text-md font-medium`}
//             >
//               Resmues
//             </button>
//             <button
//               className={`${styles.navbar_title} border m-2 p-1 rounded text-md font-medium`}
//             >
//               Music
//             </button>
//             <button
//               className={`${styles.navbar_title} border m-2 p-1 rounded text-md font-medium`}
//             >
//               Live
//             </button>
//             <button
//               className={`${styles.navbar_title} border m-2 p-1 rounded text-md font-medium`}
//             >
//               Stocks
//             </button>
//             <button
//               className={`${styles.navbar_title} border m-2 p-1 rounded text-md font-medium`}
//             >
//               {">"}
//             </button>
//           </div>
//         </div> */}
//         </div>
//       )}
//     </>
//   );
// };

// export default Navbar;
"use client";
import React, { useContext, useEffect, useState } from "react";
import { Button, buttonVariants } from "../ui/button";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsVoiceIcon from "@mui/icons-material/SettingsVoice";
import EmergencyRecordingIcon from "@mui/icons-material/EmergencyRecording";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Face6Icon from "@mui/icons-material/Face6";
import styles from "./Navbar.module.css";
import { useRouter } from "next/navigation";
import { FormDataType } from "@/app/(auth)/signup/page";
import { UserContext } from "@/app/provider";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axios from "axios";
import Link from "next/link";
import UseAuth from "../UseAuth";

const Navbar = () => {
  const [showBottomProfile, setShowBottomProfile] = useState(false);
  const router = useRouter();
  const loggedInUser = useContext(UserContext);
  const { allowuser, setAllowUser } = UseAuth();
  console.log("allow user from nav", allowuser);

  const gotoProfile = () => {
    console.log("go to clicked");
    router.push("/userprofile");
  };

  const gotToVideoPage = () => {
    router.push("/videoupload");
  };

  const logoutHandler = async () => {
    console.log("logout checking..");
    try {
      const result = await axios.post(
        "http://localhost:5000/api/v1/users/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (result.data) {
        localStorage.clear();
        setAllowUser(false);
        router.push("/login");
        alert("Logged out ");
      }
      console.log("Logged out", result.data);
    } catch (error) {
      console.error("Error while logging out:", error);
    }
  };

  return (
    <>
      {/* {loggedInUser !== null && ( */}
      <div className="flex flex-col w-full sticky top-0 z-50">
        <div className="w-full h-20 bg-white flex justify-between items-center px-5 sticky top-0 z-50">
          <div className="flex justify-evenly gap-3">
            <h1>
              <MenuIcon />
            </h1>
            <h2>Logo</h2>
          </div>
          <div className="flex justify-evenly gap-3">
            <input
              type="text"
              name=""
              id=""
              placeholder="Search"
              className="border border-black rounded-r-full rounded-l-full w-96 h-8 p-2"
            />
            <h2>
              <SettingsVoiceIcon />
            </h2>
          </div>
          {allowuser ? (
            <>
              <div className="flex justify-evenly gap-3">
                <div className="cursor-pointer">
                  <EmergencyRecordingIcon onClick={gotToVideoPage} />
                </div>
                <div>
                  <NotificationsNoneIcon />
                </div>
                <div className="cursor-pointer w-10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={loggedInUser?.avatar}
                    alt=""
                    className="w-6 h-6 rounded-full"
                    onClick={() => setShowBottomProfile(!showBottomProfile)}
                  />
                  {showBottomProfile && (
                    <div className="absolute ml-2">
                      <div className="text-sm relative p-1">
                        <AccountCircleIcon
                          className="text-lg"
                          onClick={gotoProfile}
                        />
                      </div>
                      <div className="text-sm p-1">
                        <LogoutIcon onClick={logoutHandler} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className={buttonVariants({ variant: "outline" })}
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
      {/* )} */}
    </>
  );
};

export default Navbar;
