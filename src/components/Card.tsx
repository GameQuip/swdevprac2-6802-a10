"use client";
import { useState } from "react";
import Image from "next/image";
import { Rating, Box } from "@mui/material";
import InteractiveCard from "./InteractiveCard";

interface CardProps {
  venueName: string;
  imgSrc: string;
  onRatingChange?: (venue: string, value: number) => void;
}

export default function Card({ venueName, imgSrc, onRatingChange }: CardProps) {
  const [value, setValue] = useState<number | null>(0);
  const identifier = `${venueName} Rating`;

  return (
    <InteractiveCard contentName={venueName}>
      <div className="relative w-full aspect-video overflow-hidden rounded-t-lg">
        <Image
          src={imgSrc}
          alt={venueName}
          fill
          priority
          className="object-cover transition-transform duration-500 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="m-2 p-4">
        <h3 className="mb-3 text-xl font-bold text-blue-600">{venueName}</h3>
        {/* <p className="px-2 mb-2 text-base leading-relaxed text-gray-600">
          A stunning {venueName} where love blossoms and unforgettable memories
          are made.
        </p> */}
        <div className="mb-2 border-t border-gray-100"></div>
        {onRatingChange ? (
          <Box
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            onMouseDown={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <Rating
              id={identifier}
              name={identifier}
              data-testid={identifier}
              value={value}
              onChange={(event, newValue) => {
                const rating = newValue || 0;
                setValue(rating);
                onRatingChange(venueName, rating);
              }}
            />
          </Box>
        ) : null}
      </div>
    </InteractiveCard>
  );
}
