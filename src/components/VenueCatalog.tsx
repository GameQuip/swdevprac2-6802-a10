"use client";
import { use, useReducer } from "react";
import { mockVenue } from "@/data/mockData";
import Link from "next/link";
import Card from "@/components/Card";
import { VenueItem, VenueJson } from "../types/venue-interface";

/*
type Action =
  | { type: "UPDATE_RATING"; venueName: string; rating: number }
  | { type: "REMOVE_VENUE"; venueName: string };

const ratingReducer = (state: Map<string, number>, action: Action) => {
  const newState = new Map(state);
  switch (action.type) {
    case "UPDATE_RATING":
      return newState.set(action.venueName, action.rating);
    case "REMOVE_VENUE":
      newState.delete(action.venueName);
      return newState;
    default:
      return state;
  }
};
*/

interface VenueCatalogProps {
  venuesJson: Promise<VenueJson>;
}

export default function VenueCatalog({ venuesJson }: VenueCatalogProps) {
  const resolvedVenues =
    venuesJson instanceof Promise ? use(venuesJson) : venuesJson;
  const venuesData = resolvedVenues?.data;
  if (!venuesData) return <p>No data</p>;

  /*
  const initialState = new Map(
    venuesData?.map((venue: VenueItem) => [venue.name, 0]),
  );
  const [ratingMap, dispatch] = useReducer(ratingReducer, initialState);
  */

  return (
    <div className="p-6 md:p-10 bg-slate-50 min-h-screen rounded-md">
      <div className="text-center mb-12">
        <h4 className="text-xl md:text-2xl font-bold text-gray-700 tracking-tight mb-2">
          Explore {resolvedVenues.count} venues in our catalog
        </h4>
        <div className="h-1 w-100 bg-cyan-500 mx-auto rounded-full"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 mx-auto">
        {venuesData.map((venueItem: VenueItem) => (
          <Link
            href={`/venue/${venueItem._id}`}
            key={venueItem._id}
            className="group no-underline"
          >
            <div className="transition-all duration-300 transform group-hover:-translate-y-2 group-hover:shadow-2xl">
              <Card
                venueName={venueItem.name}
                imgSrc={venueItem.picture} /*
                onRatingChange={(v, r) =>
                    dispatch({ type: "UPDATE_RATING", venueName: v, rating: r })
                } */
              />
            </div>
          </Link>
        ))}
      </div>

      {/*
      <div className="mt-16 bg-gray-50 p-8 rounded-2xl shadow-inner border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Rating Summary</h2>
          <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
            {ratingMap.size}
          </span>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {Array.from(ratingMap.entries()).map(([name, rating]) => (
            <div
              key={name}
              data-testid={name}
              className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm border border-gray-100 cursor-pointer hover:bg-red-50 transition-all group"
              onClick={() =>
                dispatch({ type: "REMOVE_VENUE", venueName: name })
              }
            >
              <div className="flex items-center gap-3">
                <span className="font-semibold text-gray-700">{name}</span>
                <span className="text-xs text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  (Click to remove)
                </span>
              </div>
              <span className="font-mono font-bold text-blue-600 bg-blue-50 px-4 py-1 rounded-full">
                {rating}
              </span>
            </div>
          ))}
          {ratingMap.size === 0 && (
            <p className="text-center text-gray-400 italic">
              No ratings to show.
            </p>
          )}
        </div>
      </div>
      */}
    </div>
  );
}
