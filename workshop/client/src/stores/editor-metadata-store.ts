import { useCallback } from "react";
import create from "zustand";

export interface EditorMetadataStore {
  isReady: boolean;
  setIsReady: (isReady: boolean) => void;
}

export const useEditorMetadataStore = create<EditorMetadataStore>((set) => ({
  isReady: false,
  setIsReady: (isReady) => set({ isReady }),
}));

export const useEditorIsReady = () => {
  const isReady = useEditorMetadataStore(
    useCallback(({ isReady }) => isReady, [])
  );
  const setIsReady = useEditorMetadataStore(
    useCallback(({ setIsReady }) => setIsReady, [])
  );

  return { isReady, setIsReady };
};
