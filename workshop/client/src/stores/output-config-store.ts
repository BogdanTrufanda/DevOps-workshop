import { useCallback } from "react";
import create from "zustand";
import { persist } from "zustand/middleware";

export type OutputConfig = {
  showOnlyLastInput: boolean;
  showMostRecentOnTop: boolean;
};

export type OutputPartialConfig = Partial<OutputConfig>;

export interface OutputConfigStore {
  config: OutputConfig;
  setConfig: (partialConfig: OutputPartialConfig) => void;
}

export const useOutputConfigStore = create<OutputConfigStore>(
  persist(
    (set) => ({
      config: {
        showOnlyLastInput: false,
        showMostRecentOnTop: false,
      },

      setConfig: (partial) =>
        set(({ config }) => ({ config: { ...config, ...partial } })),
    }),
    {
      name: "output-config-store",
    }
  )
);

export const useOutputConfig = () => {
  const config = useOutputConfigStore(useCallback(({ config }) => config, []));

  const setConfig = useOutputConfigStore(
    useCallback(({ setConfig }) => setConfig, [])
  );

  return { config, setConfig };
};
