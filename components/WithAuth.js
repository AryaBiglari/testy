import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, CircularProgress } from "@mui/material";

const withAuth = (WrappedComponent) => {
  const WithAuthComponent = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
      const checkAuth = async () => {
        const isAuthenticated = localStorage.getItem("isAuthenticated");
        if (isAuthenticated !== "true") {
          router.push("/login");
        } else {
          setIsLoading(false);
        }
      };
      checkAuth();
    }, []);

    if (isLoading) {
      return (
        <Box
          sx={{
            display: "flex",
            width: 1,
            minHeight: "100vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress
            size={65}
            thickness={4}
            sx={{
              color: "var(--primary75)",
            }}
          />
        </Box>
      );
    }

    return <WrappedComponent {...props} />;
  };

  return WithAuthComponent;
};

export default withAuth;
