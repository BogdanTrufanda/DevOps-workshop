import { Box, Checkbox, FormControlLabel } from "@mui/material";

import { useEditorIsReady } from "../../stores/editor-metadata-store";
import { useOutputConfig } from "../../stores/output-config-store";

import { MainbarRunButton } from "./MainbarRunButton";

export const MainbarActions = () => {
  const { isReady } = useEditorIsReady();

  const {
    config: { showMostRecentOnTop, showOnlyLastInput },
    setConfig,
  } = useOutputConfig();

  return (
    <Box display="flex" alignItems="center" gap={4}>
      <FormControlLabel
        control={
          <Checkbox
            checked={showMostRecentOnTop}
            disabled={!isReady}
            onChange={(event) => {
              setConfig({
                showMostRecentOnTop: event.target.checked,
              });
            }}
          />
        }
        label="Show most recent on top"
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={showOnlyLastInput}
            disabled={!isReady}
            onChange={(event) => {
              setConfig({
                showOnlyLastInput: event.target.checked,
              });
            }}
          />
        }
        label="Show only last output"
      />

      <MainbarRunButton />
    </Box>
  );
};
