import * as React from "react";
import PartsListWithFilters from "../../components/cutting/PartsListWithFilters.js";
import withAuth from "../../components/WithAuth.js";

const Home = () => {
  return <PartsListWithFilters mode={"cutting"} />;
};

export default Home;
