import { DependencyList, useEffect, useRef } from "react";

export const useScrollIntoView = (deps: DependencyList) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
};
