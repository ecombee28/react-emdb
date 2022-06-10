import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const Loading = ({ style }) => {
  return (
    <>
      <CircularProgress
        size={style.size}
        thickness={style.thickness}
        sx={{
          color: style.color,
          position: style.position && style.position,
          right: style.right && style.right,
          top: style.top && style.top,
          left: style.left && style.left,
          bottom: style.bottom && style.bottom,
        }}
      />
    </>
  );
};

export default Loading;
