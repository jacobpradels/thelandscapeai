import Link from "next/link";

const VerifyRequest = () => {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center z-0">
      <div className="text-2xl font-medium relative bg-black relative h-fit w-3/4 sm:w-1/2 text-center z-10">
        <div className="absolute -z-10 h-[102%] w-[102%] animated-gradient-background -top-[1%] -left-[1%] blur-md rounded-md">
        </div>
        <div className="bg-black rounded-md">
          Please check your email for a secure login link to continue.
        </div>
        <div>
        </div>
      </div>
      <Link className="mt-16 text-lg hover:underline" href="/">
        Return to home
      </Link>
    </div>
  );
}

export default VerifyRequest;