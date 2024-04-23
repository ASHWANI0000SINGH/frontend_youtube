import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className=" flex justify-end mx-2 p-5">
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
  );
}
