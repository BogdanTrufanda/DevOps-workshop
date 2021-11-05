import { Mainbar } from "./components/Mainbar/Mainbar";
import { Box, Divider } from "@mui/material";
import { Editor } from "./components/Editor/Editor";
import { Output } from "./components/Output/Output";
import { useEditorIsReady } from "./stores/editor-metadata-store";
import { Notification } from "./components/Notification/Notification";

export const App = () => {
  const { isReady } = useEditorIsReady();

  return (
    <Box display="flex" flexDirection="column" height="100vh">
      <Notification />

      <Mainbar />
      <Divider />

      <Box
        flexGrow={1}
        display="grid"
        gridTemplateColumns="55% 45%"
        minHeight={0}
      >
        <Box minHeight={0} overflow="hidden" bgcolor="#1e1e1e">
          <Editor />
        </Box>

        <Box minHeight={0} overflow="hidden">
          {isReady && <Output />}
        </Box>
      </Box>
    </Box>
  );
};
