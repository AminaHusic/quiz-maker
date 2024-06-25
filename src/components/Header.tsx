import { Link, useLocation } from "react-router-dom";
import logo from "../assets/questionMark.png";
import { menuLinks } from "../constants/constants";

const Header = () => {
  const location = useLocation().pathname;
  return (
    <div className="w-full bg-transparent shadow-md border-b border-b-gray-light">
      <div className="flex justify-between w-4/5 max-w-[1440px] mx-auto py-4 items-center">
        <Link to={"/"}>
          <img src={logo} alt="logo" className="max-w-10" />
        </Link>

        <div className="flex gap-3">
          {menuLinks.map((link) => (
            <Link
              to={link.path}
              key={link.path}
              className={`${
                location === link.path
                  ? "text-secondary border-b border-b-secondary hover:border-b-primary-dark"
                  : "text-primary"
              }  hover:text-primary-dark`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Header;
