import React from "react";
import Image from "next/image";
import Link from "next/link";
import TopMenuItem from "./TopMenuItem";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export default async function TopMenu() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-xl border-b-2 border-slate-900/40 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
      <div className="flex flex-row justify-between h-full">
        <div className="flex flex-row items-center px-8">
          {session ? (
            <Link
              href="/api/auth/signout"
              className="text-cyan-600 text-sm font-semibold hover:text-cyan-800 transition-colors pr-8"
            >
              Sign-Out of {session.user?.name}
            </Link>
          ) : (
            <Link
              href="/api/auth/signin"
              className="text-cyan-600 text-sm font-semibold hover:text-cyan-800 transition-colors pr-12"
            >
              Sign-In
            </Link>
          )}

          <Link
            href="/mybooking"
            className="text-cyan-600 text-sm font-semibold hover:text-cyan-800 transition-colors pr-12"
          >
            My Booking
          </Link>
        </div>

        <div className="flex items-center px-6"></div>

        <div className="flex flex-row-reverse items-center pl-6 border-l-2 border-slate-900/20 h-full">
          <Link
            href="/"
            className="flex items-center hover:opacity-80 transition-opacity"
          >
            <Image
              src={"/img/logo.png"}
              className="h-14 w-auto object-contain transition-transform hover:scale-110 duration-300 filter drop-shadow-md"
              alt="logo"
              width={400}
              height={400}
              priority
            />
          </Link>

          <div className="flex flex-row-reverse items-center gap-8 px-8 h-full">
            <TopMenuItem title="Booking" pageRef="booking" />
            {/* <TopMenuItem title="About" pageRef="about" /> */}
          </div>
        </div>
      </div>
    </nav>
  );
}
