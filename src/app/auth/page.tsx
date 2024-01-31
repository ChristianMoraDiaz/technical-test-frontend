"use client";
import Login from "@/components/auth/login";
import Register from "@/components/auth/register";
import { ReactElement } from "react";

export default function Page(): ReactElement {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div role="tablist" className="tabs tabs-lifted">
            <input
              type="radio"
              name="my_tabs_1"
              role="tab"
              className="tab "
              aria-label="Login"
              defaultChecked
            />
            <div role="tabpanel" className="tab-content p-8 bg-base-100 ">
              <Login />
            </div>

            <input
              type="radio"
              name="my_tabs_1"
              role="tab"
              className="tab"
              aria-label="Register"
            />
            <div role="tabpanel" className="tab-content p-8">
              <Register />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
