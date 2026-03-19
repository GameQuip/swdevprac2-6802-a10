import React from "react";
import Link from "next/link";

export default function TopMenu({
  title,
  pageRef,
}: {
  title: string;
  pageRef: string;
}) {
  return (
    <Link className="" href={pageRef}>
      <span className="text-slate-700 font-bold text-sm uppercase tracking-widest group-hover:text-cyan-600 transition-colors duration-300 drop-shadow-sm">
        {title}
      </span>
      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/40 group-hover:backdrop-blur-sm rounded-lg -z-10 transition-all duration-300 scale-90 group-hover:scale-100 border border-transparent group-hover:border-white/50 shadow-none group-hover:shadow-lg"></div>
      <div className="absolute bottom-0 left-1/2 w-0 h-[3px] bg-cyan-500 transition-all duration-300 group-hover:w-3/4 group-hover:-translate-x-1/2"></div>
    </Link>
  );
}
