import * as React from "react";
import NewSortablePlanningList from "../../components/planning/NewSortablePlanningList.js";
import withAuth from "../../components/WithAuth.js";

const Home = () => {
  return <NewSortablePlanningList />;
};

export default withAuth(Home);
