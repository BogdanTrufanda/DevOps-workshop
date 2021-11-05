import { Alert, Snackbar } from "@mui/material";
import { useNotification } from "../../stores/notification-store";

export const Notification = () => {
  const { notification, ack } = useNotification();

  const isOpen = Boolean(notification) && !notification?.acknowledged;

  return (
    <Snackbar open={isOpen} onClose={ack}>
      <Alert severity={notification?.severity} sx={{ whiteSpace: "pre-wrap" }}>
        {notification?.message}
      </Alert>
    </Snackbar>
  );
};
