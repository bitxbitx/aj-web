import React from "react";
import styles from "./Loading.module.css";
import BounceLoader from "react-spinners/BounceLoader";
import { Box } from "@mui/material";

export default function Loading() {
  return (
    <Box className={styles.loaderContainer}>
      <BounceLoader color="#484B6A" />
    </Box>
  );
}