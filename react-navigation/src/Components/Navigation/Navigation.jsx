import React, { useState } from "react";
import Navbar from "./Navbar";
import { routes } from "../../constant";
import Drawer from "./Drawer";

const Navigation = ({ handleLogOut }) => {
  const [isOpen, SetIsOpen] = useState(false);

  const toggleDrawer = () => {
    SetIsOpen(!isOpen);
  };
  console.log(routes);
  return (
    <div>
      <Drawer routes={routes} isOpen={isOpen} toggleDrawer={toggleDrawer} />
      <Navbar
        routes={routes}
        toggleDrawer={toggleDrawer}
        handleLogOut={handleLogOut}
      />
    </div>
  );
};
export default Navigation;
