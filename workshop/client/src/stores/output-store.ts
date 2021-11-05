import { useCallback } from "react";
import create from "zustand";
import { persist } from "zustand/middleware";
import { RunOutput } from "../services/run-code";
import { useOutputConfig } from "./output-config-store";

export interface OutputStore {
  isCompiling: boolean;
  outputs: RunOutput[];

  setIsCompiling: (isCompiling: boolean) => void;
  pushOutput: (output: RunOutput) => void;
}

export const useOutputStore = create<OutputStore>(
  persist(
    (set) => ({
      isCompiling: false,
      outputs: [],

      setIsCompiling: (isCompiling) => set({ isCompiling }),
      pushOutput: (output) =>
        set(({ outputs }) => ({ outputs: [...outputs, output] })),
    }),
    { name: "output-store", getStorage: () => sessionStorage }
  )
);

export const useOutputIsCompiling = () => {
  const isCompiling = useOutputStore(
    useCallback(({ isCompiling }) => isCompiling, [])
  );

  const setIsCompiling = useOutputStore(
    useCallback(({ setIsCompiling }) => setIsCompiling, [])
  );

  return { isCompiling, setIsCompiling };
};

export const useOutputList = () => {
  const {
    config: { showOnlyLastInput },
  } = useOutputConfig();

  const outputs = useOutputStore(
    useCallback(
      ({ outputs: allOutputs }) =>
        showOnlyLastInput && allOutputs.length > 0
          ? [allOutputs[allOutputs.length - 1]]
          : allOutputs,
      [showOnlyLastInput]
    )
  );

  const pushOutput = useOutputStore(
    useCallback(({ pushOutput }) => pushOutput, [])
  );

  return { outputs, pushOutput };
};
