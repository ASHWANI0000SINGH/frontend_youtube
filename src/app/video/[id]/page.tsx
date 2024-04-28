// "use client";
// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import styles from "./video.module.css";
// import { useRouter } from "next/router";
// import { useParams } from "next/navigation";
// import axios from "axios";

// interface UserType1 {
//   username: string;
//   email: string;
//   avatar: string;
//   coverImage: string;
// }
// interface VideoType1 {
//   createdAt: string;
//   duration: number;
//   owner: string;
//   thumbnail: string;
//   title: string;
//   updatedAt: string;
//   videoFile: string;
//   _id: string;
// }

// const VideoPage = () => {
//   const [videodata, setVideoData] = useState<VideoType1[] | null>([]);
//   const [user, setUser] = useState<UserType1[] | null>([]);

//   const params = useParams<{
//     [x: string]: any;
//     tag: string;
//     item: string;
//   }>();

//   console.log(params.id);
//   useEffect(() => {
//     const getAllVideo = async () => {
//       const result = await axios(
//         `http://localhost:5000/api/v1/video/fetch-byId/${params.id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//           },
//         }
//       );
//       console.log(result.data);
//       setVideoData(result.data.data[0]);
//       setUser(result.data.data[1]);

//       console.log("checking");
//     };
//     getAllVideo();
//   }, []);
//   console.log("user", user);
//   console.log("video", videodata);

//   return (
//     <>
//       <div className="flex  mx-20  ">
//         <>
//           <div className="  text-center  m-10 p-5 border border-black ">
//             <video
//               autoPlay
//               loop
//               muted
//               className={`${styles.videoplayer} border border-green-300 rounded bg-red `}
//             >
//               <source src={videodata.videoFile} />
//             </video>

//             <div className="">
//               <div className="flex justify-start ">
//                 {/* eslint-disable-next-line @next/next/no-img-element */}
//                 <img
//                   src={user.avatar}
//                   alt="Picture of the author"
//                   className=" w-10 h-10 rounded-full p-1 text-center "
//                 />
//                 <p className=" text-lg font-medium  text-center ">
//                   {videodata.title}
//                 </p>
//               </div>
//               <div className="flex flex-col justify-end  items-start   mx-10  text-gray-400 text-sm">
//                 <p> {user.username}</p>
//                 <div className="flex justify-start gap-2">
//                   {/* <p> views </p> *<p>{dateOnVideoUploaded(item.createdAt)}</p> */}
//                 </div>
//               </div>
//             </div>
//             {/* <h1> {item}</h1> */}
//           </div>
//           <div className="text-center m-10 p-5 border border-black">
//             <ul>
//               <li> Ashwani link</li>
//               <li> Ashwani link</li>
//               <li> Ashwani link</li>
//               <li> Ashwani link</li>
//               <li> Ashwani link</li>
//             </ul>
//           </div>
//         </>
//       </div>
//     </>
//   );
// };

// export default VideoPage;

"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./video.module.css";
import { useRouter } from "next/router";
import { useParams } from "next/navigation";
import axios from "axios";

interface UserType1 {
  username: string;
  email: string;
  avatar: string;
  coverImage: string;
}
interface VideoType1 {
  createdAt: string;
  duration: number;
  owner: string;
  thumbnail: string;
  title: string;
  updatedAt: string;
  videoFile: string;
  _id: string;
}

const VideoPage = () => {
  const [videodata, setVideoData] = useState<VideoType1[]>([]);
  const [user, setUser] = useState<UserType1[]>([]);

  const params = useParams<{
    [x: string]: any;
    tag: string;
    item: string;
  }>();

  console.log(params.id);
  useEffect(() => {
    const getAllVideo = async () => {
      const result = await axios(
        `http://localhost:5000/api/v1/video/fetch-byId/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log(result.data);
      setVideoData(result.data.data[0]);
      setUser(result.data.data[1]);

      console.log("checking");
    };
    getAllVideo();
  }, []);
  console.log("user", user);
  console.log("video", videodata);

  return (
    <>
      <div className="flex  mx-20  ">
        <>
          <div className="  text-center  m-10 p-5 border border-black ">
            <video
              autoPlay
              loop
              muted
              className={`${styles.videoplayer} border border-green-300 rounded bg-red `}
            >
              <source src={videodata.videoFile} />
            </video>

            <div className="">
              <div className="flex justify-start ">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={user.avatar}
                  alt="Picture of the author"
                  className=" w-10 h-10 rounded-full p-1 text-center "
                />
                <p className=" text-lg font-medium  text-center ">
                  {videodata.title}
                </p>
              </div>
              <div className="flex flex-col justify-end  items-start   mx-10  text-gray-400 text-sm">
                <p> {user.username}</p>
                <div className="flex justify-start gap-2">
                  {/* <p> views </p> *<p>{dateOnVideoUploaded(item.createdAt)}</p> */}
                </div>
              </div>
            </div>
            {/* <h1> {item}</h1> */}
          </div>
          <div className="text-center m-10 p-5 border border-black">
            <ul>
              <li> Ashwani link</li>
              <li> Ashwani link</li>
              <li> Ashwani link</li>
              <li> Ashwani link</li>
              <li> Ashwani link</li>
            </ul>
          </div>
        </>
      </div>
    </>
  );
};

export default VideoPage;
