import { Box, CircularProgress, Divider, useTheme } from "@mui/material";
import { red } from "@mui/material/colors";
import { Fragment } from "react";

import { useScrollIntoView } from "../../hooks/utility-hooks";
import { useOutputConfig } from "../../stores/output-config-store";
import { useOutputIsCompiling, useOutputList } from "../../stores/output-store";

import { useMakeStats } from "./hooks";
import { OutputEmptyMessage } from "./OutputEmptyMessage";

export const Output = () => {
  const { spacing } = useTheme();

  const { outputs } = useOutputList();
  const { isCompiling } = useOutputIsCompiling();
  const {
    config: { showMostRecentOnTop },
  } = useOutputConfig();

  const makeStats = useMakeStats();
  const endRef = useScrollIntoView([outputs, isCompiling, showMostRecentOnTop]);

  const showEmptyMessage = outputs.length === 0 && !isCompiling;

  return (
    <Box
      px={4}
      fontSize={12}
      whiteSpace="pre-wrap"
      height="100%"
      overflow="auto"
      sx={{ tabSize: spacing(4) }}
    >
      <Box
        display="flex"
        flexDirection={showMostRecentOnTop ? "column-reverse" : "column"}
      >
        {showEmptyMessage && (
          <Box py={4}>
            <OutputEmptyMessage />
          </Box>
        )}

        {outputs.map((output, index, self) => (
          <Fragment key={index}>
            <Box py={4}>
              <Box fontSize={11} mb={1} mt={-1} display="inline-flex" gap={2}>
                <Box sx={{ opacity: 0.5 }}>{makeStats(output)}</Box>
                {/* <Link color="inherit" sx={{ cursor: "pointer", opacity: 0.66 }}>
                  restore code
                </Link> */}
              </Box>

              {output?.stdout && <Box my={2}>{output.stdout}</Box>}
              {output?.stderr && (
                <Box my={2} color={red[300]}>
                  {output.stderr}
                </Box>
              )}
            </Box>

            {index < self.length - 1 && <Divider />}
          </Fragment>
        ))}

        {isCompiling && (
          <Box
            py={4}
            fontSize={11}
            sx={{ opacity: 0.5 }}
            display="flex"
            alignItems="center"
            gap={2}
          >
            <CircularProgress color="inherit" size={10} thickness={6} />
            Compiling&hellip;
          </Box>
        )}

        <Box ref={endRef} />
      </Box>
    </Box>
  );
};
