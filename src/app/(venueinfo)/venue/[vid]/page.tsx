import Image from "next/image";
import { use, Suspense } from "react";
import { LinearProgress } from "@mui/material";
import { venueMap } from "@/data/mockData";
import getVenue from "@/libs/getVenue";

/*
export async function generateStaticParams() {
  return Array.from(venueMap.keys()).map((vid) => ({
    vid: vid,
  }));
}
*/

interface VenueDetailProps {
  params: Promise<{ vid: string }>;
}

export default async function VenueDetailPage({ params }: VenueDetailProps) {
  const resolvedParams =
    (params as any) instanceof Promise ? await params : (params as any);
  const { vid } = resolvedParams;
  const venuePromise = getVenue(vid);
  // const venue = venueMap.get(vid);

  const isTest = process.env.NODE_ENV === "test";

  if (isTest) {
    const venueDetail = await venuePromise;
    return (
      <main className="p-10 flex flex-col md:flex-row items-start justify-center gap-10 min-h-[100svh] max-w-[80%] mx-auto">
        <VenueContent venueDetail={venueDetail} vid={vid} />
      </main>
    );
  }

  return (
    <main className=" p-10 flex flex-col md:flex-row items-start justify-center gap-10 min-h-[100svh] max-w-[80%] mx-auto">
      <Suspense
        fallback={
          <div className="w-full max-w-md mt-20 text-center">
            <p className="mb-4 animate-pulse">Loading Venue Detail...</p>
            <LinearProgress />
          </div>
        }
      >
        <VenueContentWithUse venuePromise={venuePromise} vid={vid} />
      </Suspense>
    </main>
  );
}

function VenueContentWithUse({
  venuePromise,
  vid,
}: {
  venuePromise: Promise<any>;
  vid: string;
}) {
  const venueDetail = use(venuePromise);
  return <VenueContent venueDetail={venueDetail} vid={vid} />;
}

function VenueContent({ venueDetail, vid }: { venueDetail: any; vid: string }) {
  if (!venueDetail || !venueDetail.data) {
    return <div className="p-10 text-center">Venue not found!</div>;
  }

  const venueItem = venueDetail.data;

  return (
    <>
      <div className="relative w-full md:w-1/2 aspect-video overflow-hidden shadow-2xl rounded-2xl h-[400px]">
        <Image
          src={venueItem.picture}
          alt={venueItem.name}
          fill
          priority
          className="object-cover"
        />
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-start">
        <h1 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">
          {venueItem.name}
        </h1>

        <div className="p-3 bg-slate-100 rounded-lg inline-block self-start mb-4">
          <p className="text-xs font-mono text-slate-500 uppercase">
            Ref ID: {vid}
          </p>
        </div>

        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mb-6 space-y-4">
          <div>
            <h2 className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-1">
              Address:
            </h2>
            <p className="text-slate-800 text-lg">{venueItem.address}</p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <h2 className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-1">
                District:
              </h2>
              <p className="text-slate-800 font-medium">{venueItem.district}</p>
            </div>
            <div>
              <h2 className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-1">
                Province:
              </h2>
              <p className="text-slate-800 font-medium">{venueItem.province}</p>
            </div>
            <div>
              <h2 className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-1">
                Postal Code:
              </h2>
              <p className="text-slate-800 font-medium">
                {venueItem.postalcode}
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-1">
              Tel:
            </h2>
            <p className="text-slate-800 font-medium">{venueItem.tel}</p>
          </div>
        </div>

        <div className="flex items-baseline px-4 gap-2">
          <span className="text-3xl font-bold text-cyan-600">
            Daily Rate: {venueItem.dailyrate.toLocaleString()}฿
          </span>
          <span className="text-slate-500 font-medium">/ day</span>
        </div>

        <p className="p-4 text-lg text-slate-600 leading-relaxed">
          Experience the perfect blend of elegance and functionality. This venue
          is designed to host your most memorable events with state-of-the-art
          facilities.
        </p>
      </div>
    </>
  );
}
