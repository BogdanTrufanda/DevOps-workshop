import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { LoadingButton } from "@mui/lab";
import { useCallback } from "react";

import { useRunCode } from "../../hooks/code-runner-hooks";
import { useEditorIsReady } from "../../stores/editor-metadata-store";
import { useOutputIsCompiling } from "../../stores/output-store";

export const MainbarRunButton = () => {
  const runCode = useRunCode();

  const { isReady } = useEditorIsReady();
  const { isCompiling } = useOutputIsCompiling();

  const onClickHandler = useCallback(() => runCode(), [runCode]);

  return (
    <LoadingButton
      variant="contained"
      loading={isCompiling}
      disabled={!isReady}
      onClick={onClickHandler}
      endIcon={<PlayArrowIcon />}
    >
      Run
    </LoadingButton>
  );
};
