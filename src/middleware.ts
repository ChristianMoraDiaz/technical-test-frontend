export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/tasks", "/tasks/create", "/tasks/edit", "/tasks/create"],
};
