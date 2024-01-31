"use client";
import { userRegister } from "@/api/auth";
import { useRouter } from "next/navigation";
import { ReactElement, useState } from "react";
import { useForm } from "react-hook-form";
import Alert from "../alert";

export default function Register(): ReactElement {
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

  const onSubmit = handleSubmit((data) => {
    if (data.password !== data.confirmPassword) {
      setAlert({
        type: "error",
        msg: "Passwords do not match",
      });
      return;
    }

    const userData = {
      name: data.username,
      email: data.email,
      password: data.password,
    };

    const userSignup = async () => {
      try {
        const response = await userRegister(userData);
        setAlert({
          type: "success",
          msg: `User ${response.name} created successfully!`,
        });
      } catch (error: any) {
        let errorMessage =
          error.message || "An error occurred while creating the user.";

        setAlert({
          type: "error",
          msg: errorMessage,
        });
      } finally {
        setTimeout(() => {
          router.push("/auth/login");
          reset();
        }, 1000);
      }
    };

    userSignup();
  });
  return (
    <>
      <form className="card-body" onSubmit={onSubmit}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name:</span>
          </label>
          <input
            type="name"
            placeholder="name"
            className="input input-bordered"
            {...register("username", {
              required: {
                value: true,
                message: "Username is required",
              },
            })}
          />
          {errors.username && (
            <span className="text-red-500 text-xs">{`${errors.username.message}`}</span>
          )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email:</span>
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
            <span className="label-text">Password:</span>
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
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Confirm Password:</span>
          </label>
          <input
            type="password"
            placeholder="password"
            className="input input-bordered"
            {...register("confirmPassword", {
              required: {
                value: true,
                message: "Confirm password is required",
              },
            })}
          />
          {errors.confirmPassword && (
            <span className="text-red-500 text-xs">{`${errors.confirmPassword.message}`}</span>
          )}
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Register</button>
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
