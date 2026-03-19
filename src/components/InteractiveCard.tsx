"use client";

import React from "react";

interface InteractiveCardProps {
  children: React.ReactNode;
  contentName: string;
}

export default function InteractiveCard({
  children,
  contentName,
}: InteractiveCardProps) {
  function onCardSelected() {
    alert("You Select " + contentName);
  }

  return (
    <div
      className="max-w-sm overflow-hidden rounded-lg cursor-pointer bg-white shadow-lg"
      // onClick={onCardSelected}
    >
      {children}
    </div>
  );
}
