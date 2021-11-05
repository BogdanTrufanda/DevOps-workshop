import MonacoEditor from "@monaco-editor/react";
import { CircularProgress } from "@mui/material";
import { useEditorCode } from "../../stores/editor-store";

import { useEditorDefaultProps, useEditorHandlers } from "./hooks";

export const Editor = () => {
  const { code } = useEditorCode();
  const { onChange, onMount } = useEditorHandlers();

  const editorDefaultProps = useEditorDefaultProps();

  return (
    <MonacoEditor
      {...editorDefaultProps}
      value={code}
      onChange={onChange}
      onMount={onMount}
      loading={<CircularProgress size={32} />}
    />
  );
};
