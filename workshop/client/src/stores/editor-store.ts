import { useCallback } from "react";
import create from "zustand";
import { persist } from "zustand/middleware";

const DEFAULT_CODE = `// c++ code
#include <iostream>
using namespace std;

int main() {
  cout << "Hello World!";
  return 0;
}
`;

export interface EditorStore {
  code: string;
  setCode: (code: string) => void;
}

export const useEditorStore = create<EditorStore>(
  persist(
    (set) => ({
      code: DEFAULT_CODE,
      setCode: (code) => set({ code }),
    }),
    {
      name: "editor-store",
    }
  )
);

export const useEditorCode = () => {
  const code = useEditorStore(useCallback(({ code }) => code, []));
  const setCode = useEditorStore(useCallback(({ setCode }) => setCode, []));

  return { code, setCode };
};
