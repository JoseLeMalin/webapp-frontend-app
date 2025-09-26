import { Link } from "@tanstack/react-router";

import { User } from "lucide-react";
import { Button } from "./ui/button";

export function NavBar() {
  return (
    <div className="space-y-2 p-2">
      <div className="p-2 flex gap-2 text-lg">
        <Link
          to="/"
          activeProps={{
            className: "font-bold",
          }}
          activeOptions={{ exact: true }}
        >
          Home
        </Link>
        <Link
          to="/posts"
          activeProps={{
            className: "font-bold",
          }}
        >
          Posts
        </Link>
        <Link
          to="/users"
          activeProps={{
            className: "font-bold",
          }}
        >
          Users
        </Link>
        <Link
          to="/route-a"
          activeProps={{
            className: "font-bold",
          }}
        >
          Pathless Layout
        </Link>
        <Link
          to="/users"
          activeProps={{
            className: "font-bold",
          }}
        >
          Deferred
        </Link>
        <Link
          // @ts-expect-error - This route does not exist
          to="/this-route-does-not-exist"
          activeProps={{
            className: "font-bold",
          }}
        >
          This Route Does Not Exist
        </Link>
        <Button variant="link" size="icon" className="size-8">
          <User />
        </Button>
        {/* <Link
          to="/deferred"
          activeProps={{
            className: "font-bold",
          }}
        >
          <User />
        </Link> */}
      </div>
    </div>
  );
}
