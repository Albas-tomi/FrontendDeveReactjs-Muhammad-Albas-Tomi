import { Button, Navbar } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";

const NavigationBar = () => {
  const userLogin = localStorage.getItem("userLogin");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userLogin");
    alert("Berhasil Logout");
    navigate("/");
  };
  return (
    <Navbar fluid rounded>
      <Link
        className="self-center whitespace-nowrap text-xl font-bold dark:text-white"
        to="/"
      >
        Restaurants App
      </Link>
      <div className="flex md:order-2">
        {userLogin === null ? (
          <Link to={"/login"}>
            <Button>Login</Button>
          </Link>
        ) : (
          <Button onClick={handleLogout}>Logout</Button>
        )}

        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Link to="/">Home</Link>
        <Navbar.Link disabled href="#">
          About
        </Navbar.Link>
        <Navbar.Link disabled href="#">
          Services
        </Navbar.Link>
        <Navbar.Link disabled href="#">
          Pricing
        </Navbar.Link>
        <Navbar.Link disabled href="#">
          Contact
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default NavigationBar;
