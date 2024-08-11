"use client";
import React from "react";

import { title } from "@/components/primitives";

export default function BlogPage() {
  return (
    <div
      className="scroll-hidden"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <div>
        <h1 className={title()}>В разработке ...</h1>
      </div>
    </div>
  );
}
