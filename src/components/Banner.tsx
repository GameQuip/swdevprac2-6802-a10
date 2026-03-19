"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Banner() {
  const covers = [
    "/img/cover.jpg",
    "/img/cover2.jpg",
    "/img/cover3.jpg",
    "/img/cover4.jpg",
  ];
  const [index, setIndex] = useState(0);

  const router = useRouter();
  /*
  useEffect(() => {
    router.prefetch("/venue");
  }, [router]);
  */

  const { data: session } = useSession();
  console.log(session?.user.token);

  return (
    <div
      className="relative w-full h-[50vh] overflow-hidden flex flex-col justify-center items-center text-center text-white cursor-pointer group"
      onClick={() => setIndex((index + 1) % covers.length)}
    >
      <Image
        src={covers[index]}
        alt="Event Venue Banner"
        fill
        priority
        sizes="100vw"
        className="object-cover -z-10 brightness-[60%] transition-transform duration-700 ease-in-out group-hover:scale-103"
      />
      <div className="z-10 px-4">
        <h1 className="text-3xl md:text-[2.5rem] font-bold m-0 drop-shadow-[2px_2px_4px_rgba(0,0,0,0.5)]">
          where every event finds its venue
        </h1>
        <p className="text-base md:text-[1.2rem] mt-[10px] font-light drop-shadow-[1px_1px_3px_rgba(0,0,0,0.5)] max-w-2xl">
          Finding the perfect venue has never been easier. Whether it's a
          wedding, corporate event, or private party, we connecting people to
          the perfect place.
        </p>
      </div>

      {session ? (
        <div className="absolute top-6 right-8 flex items-center gap-3 px-4 py-2 bg-slate-100/80 hover:bg-slate-100/70 hover:scale-102 hover:shadow-xl transition duration-300 transition-colors rounded-full border border-slate-200 shadow-sm animate-fade-in-down">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-cyan-600 text-white text-xs font-bold uppercase shadow-inner">
            {session.user?.name?.charAt(0) || "U"}
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold leading-none">
              Welcome
            </span>
            <span className="text-sm font-semibold text-slate-900 leading-tight">
              {session.user?.name}
            </span>
          </div>
        </div>
      ) : null}

      <button
        className="absolute bottom-5 right-5 z-20 bg-white text-cyan-600 text-xl px-4 py-2 rounded-md font-semibold hover:bg-cyan-100 hover:scale-105 transition duration-300"
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
          router.push("/venue");
        }}
      >
        Select Venue
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {covers.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 w-8 rounded-full transition-all ${index === i ? "bg-white" : "bg-white/30"}`}
          />
        ))}
      </div>
    </div>
  );
}
