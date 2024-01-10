import Link from "next/link";
import Messages from "./messages";
import { Button } from "@/ui";

export default function Login() {
  return (
    <div className="flex w-full px-8 justify-center gap-2">
      <form
        className="flex flex-col justify-center gap-2 text-foreground w-full max-w-md"
        method="post"
      >
        <div className="flex flex-col justify-center gap-2">
          <label className="text-md" htmlFor="email">
            Email
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            name="email"
            placeholder="you@example.com"
            required
          />
          <label className="text-md" htmlFor="password">
            Password
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            type="password"
            name="password"
            placeholder="••••••••"
            required
          />
        </div>

        <div className="w-3/4 mx-auto flex flex-col items-center gap-2 justify-center">
          <Button formAction="/auth/sign-in" type="submit" className="w-full">
            Sign In
          </Button>
          <Link href="/signup" className="w-full">
            <Button color="green" type="button" className="w-full">
              Don't have an account? Sign up!
            </Button>
          </Link>
        </div>
        <Messages />
      </form>
    </div>
  );
}
