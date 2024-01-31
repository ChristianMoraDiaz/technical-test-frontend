"use client";
import { useRouter } from "next/navigation";
import { ReactElement } from "react";
export default function Login(): ReactElement {
  const router = useRouter();
  return (
    <form className="card-body">
      <div className="form-control">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          type="email"
          placeholder="email"
          className="input input-bordered"
          required
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input
          type="password"
          placeholder="password"
          className="input input-bordered"
          required
        />
        <label className="label">
          <a href="#" className="label-text-alt link link-hover">
            Forgot password?
          </a>
        </label>
        <label className="label">
          <a
            onClick={() => {
              router.push("/auth/register");
            }}
            className="label-text-alt link link-hover"
          >
            New User?
          </a>
        </label>
      </div>
      <div className="form-control mt-6">
        <button className="btn btn-primary">Login</button>
      </div>
    </form>
  );
}
