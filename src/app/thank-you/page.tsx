
import Link from "next/link";
import './thank-you.css'

export default function ThankYouPage(){
    return(
        <main className="coming_soon_page flex-grow flex items-center justify-center px-6 py-24 sm:py-32 lg:px-8 bg-gray-50 h-[calc(100vh-38.3rem)]">
            <div className="text-center">
                <h1 className="mt-4 text-[5rem] md:text-[10rem] font-bold tracking-tight text-gray-900  title48">
                Thank You!
                </h1>
                <p className="mt-6 text-[2rem] md:text-[3rem] leading-[4rem] text-gray-600 max-w-[80rem] mx-auto">
                Thank you for your submissions. We will contact you soon!
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                    href="/"
                    className="px-[2rem] md:px-[3rem] py-[1rem] md:py-[1.5rem] text-[2rem] md:text-[2.5rem] font-semibold shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition duration-200 go_back__btn"
                >
                    Back to Homepage
                </Link>
                </div>
            </div>
            </main>
    )
}