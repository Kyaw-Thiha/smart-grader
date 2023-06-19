import { signIn } from "next-auth/react";

import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import NavBar from "@components/HomeNavBar";

const SignIn: NextPage = () => {
  const signInToProvider = (provider: "google" | "zoom") => {
    return void signIn(provider, {
      callbackUrl: `${window.location.origin}/my-worksheets`,
    });
  };

  return (
    <>
      <Head>
        <title>Sign In - SmartGrader</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <main className="flex min-h-screen items-center justify-center">
        <div className="flex min-w-[40vw] flex-col items-center justify-center rounded-lg bg-gray-200 px-6 shadow-xl">
          <Image
            src="/images/logo-icon.png"
            alt="Logo"
            width="50"
            height="50"
            className="mt-20"
          />
          <h1 className="mb-12 mt-4 text-4xl">Welcome To SmartGrader</h1>
          <button
            className="btn-primary btn my-2 gap-2"
            onClick={signInToProvider("zoom")}
          >
            <Image
              src="/images/social/zoom.png"
              alt="Zoom"
              width="30"
              height="30"
            />
            Sign In With Zoom
          </button>
          OR
          <button
            className="btn-primary btn my-2 mb-20 gap-2"
            onClick={signInToProvider("google")}
          >
            <Image
              src="/images/social/google.png"
              alt="Zoom"
              width="30"
              height="30"
            />
            Sign In With Google
          </button>
        </div>
      </main>
    </>
  );
};

export default SignIn;
