import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex-grow flex items-center justify-center px-6 py-24 sm:py-32 lg:px-8 bg-gray-50 h-[calc(100vh-38.3rem)]">
      <div className="text-center">
        <h1 className="mt-4 text-[5rem] md:text-[10rem] font-bold tracking-tight text-gray-900 uppercase">
          Page not found
        </h1>
        <p className="mt-6 text-[2rem] md:text-[3rem] leading-[4rem] text-gray-600 max-w-[80rem] mx-auto">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It
          might have been removed or the link is incorrect.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/"
            className="rounded-md bg-blue-600 px-[2rem] md:px-[3rem] py-[1rem] md:py-[1.5rem] text-[2rem] md:text-[2.5rem] font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition duration-200"
          >
            Go back home
          </Link>
        </div>
      </div>
    </main>
  );
}
