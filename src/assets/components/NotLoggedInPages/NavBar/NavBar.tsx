import { useState } from "react";
import "../../../Styles/navbar.css"
import { Link } from "react-router-dom";

interface NavItem{
    label : string;
    path : string;
}

interface NavBarProps {
  imageSrcPath: string;
  navItems: NavItem[];
}

function NavBar({imageSrcPath, navItems }: NavBarProps) {

  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-white shadow">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img
            src={imageSrcPath}
            width="200"
            height="75"
            className="d-inline-block align-center"
            alt=""
          />
         
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="collapse
         navbar-collapse"
        id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-md-1">
            {navItems.map((item, index) => (
              <li
                key={item.label}
                className="nav-item"
                onClick={() => setSelectedIndex(index)}
              >
                <Link
                    className={
                    selectedIndex == index
                      ? "nav-link active fw-bold"
                      : "nav-link"
                  }
                  to={item.path}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <form className="d-flex me-3">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              style={{borderColor: "#389fff"}}
            />
            <button className="btn btn-outline-success" type="submit" style={{ color: "#389fff", borderColor: "#389fff"}}>
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;