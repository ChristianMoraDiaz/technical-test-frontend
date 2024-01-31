"use client";
import Register from "@/components/auth/register";
import { ReactElement } from "react";

export default function Page(): ReactElement {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 p-10">
          <h1 className="text-lg font-bold">Register</h1>
          <Register />
        </div>
      </div>
    </div>
  );
}
