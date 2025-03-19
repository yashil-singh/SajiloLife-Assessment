import { Link, NavLink } from "react-router-dom";
import Logo from "./Logo";
import { MapPin, Search } from "lucide-react";
import Button from "./Button";
import useLocation from "@/hooks/useLocationContext";

const Header = () => {
  const { location } = useLocation();

  return (
    <header className="bg-background sticky top-0 w-full py-6">
      <div className="fluid flex items-center justify-between gap-4 pl-8">
        <section className="flex items-center gap-10">
          <Link to="/">
            <Logo className="text-3xl" />
          </Link>

          <div className="h-5 border-r border-gray-300 max-sm:hidden"></div>

          <nav className="hidden items-center gap-12 sm:flex">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${isActive && "font-semibold underline"}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/articles"
              className={({ isActive }) =>
                `${isActive && "font-semibold underline"}`
              }
            >
              Articles
            </NavLink>
          </nav>
        </section>

        <section className="flex items-center gap-2">
          {location && (
            <span className="text-primary flex items-center gap-1 text-sm underline">
              <MapPin className="size-5" /> {location}
            </span>
          )}

          <Link to="/search">
            <Button variant="ghost" size="icon">
              <Search className="size-5" />
            </Button>
          </Link>
        </section>
      </div>
    </header>
  );
};

export default Header;
