import React from "react";
import { CircularProgress } from "@mui/material";
import "./LoadingSpinner.scss";

type Props = {};

function LoadingSpinner({}: Props) {
  return (
    <div className="progress-wrapper" data-testid="progress">
      <CircularProgress color="secondary" size={50} className="progress" />
    </div>
  );
}

export default LoadingSpinner;
