import React from "react";
import { Box } from "./components-library/Index";
import GoogleTrends from "google-trends-api";
import Axios from "axios";
// import { Container } from './styles';

function components() {
  React.useEffect(() => {
    Axios.get("/test")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Box bg="white" width="25%">
      test
    </Box>
  );
}

export default components;
