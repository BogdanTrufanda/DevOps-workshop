import { EditorProps, OnChange, OnMount } from "@monaco-editor/react";
import { useTheme } from "@mui/material";
import { useCallback, useMemo } from "react";
import { useEditorIsReady } from "../../stores/editor-metadata-store";
import { useEditorCode } from "../../stores/editor-store";

export const useEditorHandlers = () => {
  const { setCode } = useEditorCode();
  const { setIsReady } = useEditorIsReady();

  const onChange = useCallback<OnChange>(
    (value) => {
      setCode?.(value ?? "");
    },
    [setCode]
  );

  const onMount = useCallback<OnMount>(() => {
    setIsReady(true);
  }, [setIsReady]);

  return { onChange, onMount };
};

export const useEditorDefaultProps = () => {
  const { spacing } = useTheme();

  return useMemo<EditorProps>(
    () => ({
      defaultLanguage: "cpp",
      theme: "vs-dark",
      options: {
        fixedOverflowWidgets: false,
        fontSize: 14,
        fontFamily: "'Fira Code', monospace",
        fontLigatures: true,
        fontWeight: "400",
        smoothScrolling: true,
        copyWithSyntaxHighlighting: false,
        lineDecorationsWidth: 0,
        lineNumbersMinChars: 4,
        contextmenu: false,
        wordWrap: "on",
        padding: {
          top: parseInt(spacing(4), 10),
          bottom: parseInt(spacing(4), 10),
        },
      },
    }),
    [spacing]
  );
};
