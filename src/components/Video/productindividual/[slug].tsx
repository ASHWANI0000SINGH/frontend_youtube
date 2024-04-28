import React, { useEffect, useState } from "react";
import { CardHeader } from "@mui/material";
import Image from "next/image";
import ReactPlayer from "react-player";
import axios from "axios";
import { useRouter } from "next/router";
import { VideoType } from "@/components/AllVideo/AllVideo";

const Video = ({ videoData }: VideoType) => {
  const [videoData, setVideoData] = useState<VideoType[]>([]);
  const router = useRouter();
  const { id } = router.query;
  console.log("id", id);
  useEffect(() => {
    const getVideoWithId = async () => {
      const result = await axios(
        `http://localhost:5000/api/v1/video/video/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log(result.data.data);
      setVideoData(result.data.data);
      console.log("checking");
    };
    getVideoWithId();
  }, []);
  const dateOnVideoUploaded = (createdAt: string) => {
    const uploadDate = new Date(createdAt);
    const month = ("0" + (uploadDate.getMonth() + 1)).slice(-2); // Format month (01 - 12)
    const day = ("0" + uploadDate.getDate()).slice(-2); // Format day (01 - 31)
    return `${month}/${day}`; // Return formatted date (MM/DD)
  };
  const routeToIndividualVideo = (item: VideoType) => {
    console.log("item", item?._id);
    // route.push("eachproduct/productid/{id}");
    router.push(`/video/${item?._id}`);
  };
  return (
    <>
      <div className="flex justify-center flex-wrap align-center ">
        {videoData &&
          videoData?.map((item: VideoType) => {
            return (
              <>
                <div className=" w-80 h-80 text-center  m-2 p-1  ">
                  <video
                    autoPlay
                    loop
                    muted
                    className="w-80 h-44 border border-green-300 rounded bg-red "
                    onClick={() => routeToIndividualVideo(item)}
                    // style={{
                    //   width: "300px",
                    //   height: "200px",
                    //   marginTop: "-15px",
                    // }}
                  >
                    <source src={item.videoFile} />
                  </video>

                  {/* <ReactPlayer
                    width="530px"
                    height="300px"
                    url={item.videoFile}
                    light="/static/normal-sarong-0007.jpg"
                  /> */}
                  <div className="">
                    <div className="flex justify-start ">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.users[0]?.avatar}
                        alt="Picture of the author"
                        className=" w-10 h-10 rounded-full p-1 text-center "
                      />
                      <p className=" text-lg font-medium  text-center ">
                        {item.title}
                      </p>
                    </div>
                    <div className="flex flex-col justify-end  items-start   mx-10  text-gray-400 text-sm">
                      <p> {item.users[0]?.username}</p>
                      <div className="flex justify-start gap-2">
                        <p> views </p> *
                        <p>{dateOnVideoUploaded(item.createdAt)}</p>
                      </div>
                    </div>
                  </div>
                  {/* <h1> {item}</h1> */}
                </div>
              </>
            );
          })}
      </div>
    </>
  );
};

export default Video;
