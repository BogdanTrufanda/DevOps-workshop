import { AlertColor as Severity } from "@mui/material";

import { useCallback } from "react";
import create from "zustand";

export type Notification = {
  severity: Severity;
  message: string;
  acknowledged: boolean;
};

export interface NotificationStore {
  notification: Notification | null;
  notify: (message: string, severity?: Severity) => void;
  ack: () => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notification: null,
  notify: (message, severity = "info") =>
    set({
      notification: {
        message,
        severity,
        acknowledged: false,
      },
    }),
  ack: () =>
    set(({ notification }) => {
      return {
        notification:
          notification != null ? { ...notification, acknowledged: true } : null,
      };
    }),
}));

export const useNotification = () => {
  const notify = useNotificationStore(useCallback(({ notify }) => notify, []));
  const ack = useNotificationStore(useCallback(({ ack }) => ack, []));

  const notification = useNotificationStore(
    useCallback(({ notification }) => notification, [])
  );

  return { notify, notification, ack };
};
