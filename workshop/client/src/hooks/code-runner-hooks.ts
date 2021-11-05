import { useCallback } from "react";
import { runCode } from "../services/run-code";
import { useEditorCode } from "../stores/editor-store";
import { useNotification } from "../stores/notification-store";
import { useOutputIsCompiling, useOutputList } from "../stores/output-store";

export const useRunCode = () => {
  const { code } = useEditorCode();
  const { pushOutput } = useOutputList();
  const { setIsCompiling } = useOutputIsCompiling();
  const { notify } = useNotification();

  return useCallback(async () => {
    setIsCompiling(true);

    try {
      pushOutput(await runCode(code));
    } catch (e) {
      if (typeof e === "string") {
        notify(e, "error");
        return;
      }

      if (e instanceof Error) {
        notify(e.message, "error");
        return;
      }

      notify(JSON.stringify(e, null, 4), "error");
    } finally {
      setIsCompiling(false);
    }
  }, [code, notify, pushOutput, setIsCompiling]);
};
