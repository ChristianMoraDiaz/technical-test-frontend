"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactElement, useState } from "react";
import { useForm } from "react-hook-form";
import Alert from "../alert";

export default function Login(): ReactElement {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [alert, setAlert] = useState<{
    type: "info" | "success" | "error" | "warning";
    msg: string;
    error?: string;
  } | null>(null);
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (res?.error) {
      setAlert({
        type: "error",
        msg: `${res.error}`,
      });
    } else {
      setTimeout(() => {
        router.push("/tasks");
        reset();
      }, 800);
    }
  });

  return (
    <>
      <form className="card-body" onSubmit={onSubmit}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="email"
            className="input input-bordered"
            {...register("email", {
              required: {
                value: true,
                message: "Email is required",
              },
            })}
          />
          {errors.email && (
            <span className="text-red-500 text-xs">{`${errors.email.message}`}</span>
          )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="password"
            className="input input-bordered"
            {...register("password", {
              required: {
                value: true,
                message: "Password is required",
              },
            })}
          />
          {errors.password && (
            <span className="text-red-500 text-xs">{`${errors.password.message}`}</span>
          )}
          <div>
            <label className="label">
              <a
                onClick={() => {
                  router.push("/auth/register");
                }}
                className="label-text-alt link link-hover"
              >
                New User?, Register
              </a>
            </label>
          </div>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
      </form>
      {alert && (
        <Alert
          type={alert.type}
          msg={alert.msg}
          onClose={() => setAlert(null)}
          time={1500}
        />
      )}
    </>
  );
}
