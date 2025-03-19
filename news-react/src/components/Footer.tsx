import { NavLink } from "react-router-dom";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="flex h-64 w-full flex-col items-center justify-center">
      <section className="fluid flex h-full flex-col items-center justify-end pb-10">
        <Logo className="text-center text-5xl" />

        <p className="text-sm font-semibold text-gray-500">
          Stay Informed, Stay Ahead!
        </p>

        <nav className="mt-10 flex items-center gap-4 text-sm">
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

      <section className="bg-primary flex h-10 w-full items-center justify-center">
        <p className="text-center text-sm font-semibold text-white">
          Copyright © 2025 Buzz
        </p>
      </section>
    </footer>
  );
};

export default Footer;
