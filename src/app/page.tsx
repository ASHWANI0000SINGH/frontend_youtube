import AllVideo from "@/components/AllVideo/AllVideo";
import { buttonVariants } from "@/components/ui/button";
import { all } from "axios";
import Link from "next/link";

export default function Home() {
  const allow = false;

  return (
    <>
      {allow ? (
        <>
          <div className=" flex justify-end mx-2 p-5 border-sky-100">
            <div className="m-2">
              <Link
                href="/login"
                className={buttonVariants({ variant: "outline" })}
              >
                Login
              </Link>
            </div>
            <div className="m-2">
              <Link
                href="/signup"
                className={buttonVariants({ variant: "outline" })}
              >
                Signup
              </Link>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className=" ml-5 font-bold mt-5 text-black">
            <p className="text-center">Succesfully logged In</p>
          </div>
          <div className="video-container">
            <AllVideo />
          </div>
        </>
      )}
    </>
  );
}
