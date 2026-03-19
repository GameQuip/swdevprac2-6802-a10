import CardPanel from "@/components/CardPanel";
import VenueCatalog from "@/components/VenueCatalog";
import getVenues from "@/libs/getVenues";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";

export default function Venue() {
  const venues = getVenues();

  return (
    <main className="p-10 flex flex-col items-center min-h-[100svh] font-sans">
      <h1 className="text-3xl font-bold mb-8 text-slate uppercase tracking-widest">
        Select Your Venue
      </h1>

      <Suspense
        fallback={
          <div className="w-full max-w-md mt-20 text-center">
            <p className="mb-4 animate-pulse">Loading Venues...</p>
            <LinearProgress />
          </div>
        }
      >
        <VenueCatalog venuesJson={venues} />
      </Suspense>
    </main>
  );
}
