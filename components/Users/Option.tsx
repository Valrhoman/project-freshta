import Link from "next/link";
export default function Option({ to }: any) {
  return (
    <>
      {to === "/account/register" && (
        <div className="mt-8 text-center text-xl text-gray-500">
          <p>
            Not yet registered?{" "}
            <span className="text-gray-800 hover:text-greeny-500">
              <Link href={"/account/register"}>Create Account</Link>
            </span>
          </p>
        </div>
      )}
      {to === "/account/login" && (
        <div className="mt-8 text-center text-xl text-gray-500">
          <p>
            Already have an account?{" "}
            <span className="text-gray-800 hover:text-greeny-500">
              <Link href={"/account/login"}>Log in</Link>
            </span>
          </p>
        </div>
      )}
    </>
  );
}
