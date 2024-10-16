import * as React from "react";
import SortablePlanningList from "../../components/planning/SortablePlanningList.js";
import withAuth from "../../components/WithAuth.js";

const Home = () => {
  return <SortablePlanningList />;
};

export default withAuth(Home);
