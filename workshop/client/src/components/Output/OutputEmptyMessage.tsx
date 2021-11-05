import { Box, Link } from "@mui/material";
import { useCallback } from "react";

import { useRunCode } from "../../hooks/code-runner-hooks";

export const OutputEmptyMessage = () => {
  const runCode = useRunCode();
  const onLinkClickHandler = useCallback(() => runCode(), [runCode]);

  return (
    <Box>
      There's no output, yet
      <br />
      Try to{" "}
      <Link
        onClick={onLinkClickHandler}
        sx={{ cursor: "pointer", fontWeight: "bold" }}
      >
        run the code
      </Link>{" "}
      from editor to see any output
    </Box>
  );
};
