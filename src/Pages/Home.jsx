import Header from "@/Components/ui/Header/Header";
import { UserButton } from "@clerk/clerk-react";
import { AtomIcon, Edit, Share2 } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="">
      <Header />
      <div>
        <section className="z-50">
          <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              Build Your Resume <span className="text-primary">With AI</span>{" "}
            </h1>
            <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
              Effortlessly Craft a Standout Resume with Our AI-Powered Builder
            </p>

            <section className="py-8 bg-white z-50 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
              <h2 className="font-bold text-3xl">How it Works?</h2>
              <h2 className="text-md text-gray-500">
                Give interviews in just 3 simplar easy step
              </h2>

              <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                <a
                  className="block rounded-xl border bg-white
         border-gray-200 p-8 shadow-xl transition
         hover:border-pink-500/10 hover:shadow-pink-500/10"
                  href="#"
                >
                  <AtomIcon className="h-8 w-8" />

                  <h2 className="mt-4 text-xl font-bold text-black">
                    Write details in your resume
                  </h2>

                  <p className="mt-1 text-sm text-gray-600">
                    Start by entering your personal information, work
                    experience, education, and skills. Our AI will guide you
                    with smart suggestions to make your resume stand out.
                  </p>
                </a>

                <a
                  className="block rounded-xl border bg-white border-gray-200 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
                  href="#"
                >
                  <Edit className="h-8 w-8" />

                  <h2 className="mt-4 text-xl font-bold text-black">
                  Customize Your Resume
                  </h2>

                  <p className="mt-1 text-sm text-gray-600">
                    Use our intuitive editor to tweak the layout, fonts, and
                    colors. Add or remove sections to tailor your resume for
                    specific job applications.
                  </p>
                </a>

                <a
                  className="block rounded-xl border bg-white border-gray-200 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
                  href="#"
                >
                  <Share2 className="h-8 w-8" />

                  <h2 className="mt-4 text-xl font-bold text-black">
                  Download & Share
                  </h2>

                  <p className="mt-1 text-sm text-gray-600">
                    Once you're satisfied, download your resume in PDF format or
                    share it directly with employers. Your dream job is just a
                    click away!
                  </p>
                </a>
              </div>

              <div className="mt-12 text-center">
                <Link
                  to="/auth/signin"
                  className="inline-block rounded bg-[#007AFF] hover:bg-[#312ECB] px-12 py-3 text-sm font-medium text-white transition  focus:outline-none focus:ring focus:ring-yellow-400"
                >
                  Get Started Today
                </Link>
              </div>
            </section>
          </div>
        </section>
      </div>
      {/* Footer Section */}
      <footer className="bg-gray-100 py-6 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 text-sm">
            &copy; 2024-2025 Resume Builder. All rights reserved.
          </p>
          <p className="text-gray-600 text-sm mt-2">
            Developed by{" "}
            <Link
              to={"https://www.linkedin.com/in/kartik-singh-6b63871a5/"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#007AFF] text-sm hover:underline"
            >
              Kartik Singh
            </Link>
          </p>
          <div className="mt-4 flex justify-center space-x-4">
            <Link
              href="/terms"
              className="text-gray-600 hover:text-[#007AFF] text-sm"
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy"
              className="text-gray-600 hover:text-[#007AFF] text-sm"
            >
              Privacy Policy
            </Link>
            <Link
              href="/contact"
              className="text-gray-600 hover:text-[#007AFF] text-sm"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
