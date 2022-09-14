import userEvent from "@testing-library/user-event";
import React from "react";
import MenuHeader from "../components/auth/MenuHeader";

const Home = () => {

  return (
    <div>
      <MenuHeader />
      <h1>Page d'accueil</h1>
      
    </div>
  );
};

export default Home;
