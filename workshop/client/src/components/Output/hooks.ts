// import { format, formatDistance } from "date-fns";
import { useCallback } from "react";
import { RunOutput } from "../../services/run-code";

export const useMakeStats = () => {
  return useCallback((output: RunOutput) => {
    if (!output) return `Unknown output`;

    const { stats } = output;

    if (!stats?.compilation_time && !stats?.run_time) {
      return `No stats are available`;
    }

    return "Compilation time: " + (stats?.compilation_time ? stats?.compilation_time : "unknown")
      + "\n"+
      "Run time: " + (stats?.run_time ? stats?.run_time : "unknown")

    // const timestampCopy = stats?.timestamp
    //   ? format(stats.timestamp, "kk:mm:ss")
    //   : "--:--:--";

    // let durationCopy = `took `;

    // durationCopy += stats?.time
    //   ? formatDistance(0, stats.time, { includeSeconds: true })
    //   : "unknown";

    // return [timestampCopy, durationCopy].join(" – ");
  }, []);
};
