"use client";
import { SessionProvider, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function NavBar() {
  return (
    <SessionProvider>
      <NavBarContent />
    </SessionProvider>
  );
}

function NavBarContent() {
  const { data: session } = useSession();

  return (
    <div className="navbar shadow-2xl bg-base-100 pl-8 pr-8 ">
      <div className="navbar-start">
        <button className="btn btn-ghost">
          <Link href="/">Home</Link>
        </button>
      </div>

      <div className="navbar-end">
        <div className="dropdown pr-2">
          <button tabIndex={0} className="btn btn-ghost">
            Tasks
          </button>
          <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-28">
            <li>
              <Link href="/tasks">All Tasks</Link>
            </li>
            <li>
              <Link href="/tasks/create">Create</Link>
            </li>
          </ul>
        </div>
        {session ? (
          <button
            className="btn btn-ghost"
            onClick={() => {
              signOut();
            }}
          >
            Logout
          </button>
        ) : (
          <button className="btn btn-ghost">
            <Link href="/auth/login">Login</Link>
          </button>
        )}
      </div>
    </div>
  );
}
