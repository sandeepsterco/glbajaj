import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex-grow flex items-center justify-center px-6 py-24 sm:py-32 lg:px-8 bg-gray-50 min-h-[calc(100vh-38.3rem)] bg-white">
      <div className="text-center">
        <div className="gif_animation h-[60rem] w-[100rem] bg-[url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif')] bg-center bg-no-repeat bg-contain" />
        <div className="mt-[-10rem]">

          <h1 className="mt-4 text-[5rem] md:text-[5rem] font-medium tracking-tight text-gray-900">
          Look like you're lost
          </h1>
          <p className="mt-6 text-[2rem] md:text-[3rem] leading-[4rem] text-gray-600 max-w-[80rem] mx-auto">
          the page you are looking for not avaible!


          </p>
          <div className="mt-[5rem] flex items-center justify-center gap-x-6">
            <Link
              href="/"
              className="rounded-md bg-blue-600 px-[2rem] md:px-[3rem] py-[1rem] md:py-[1.5rem] text-[2rem] md:text-[2.5rem] font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition duration-200"
            >
              Go back home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
