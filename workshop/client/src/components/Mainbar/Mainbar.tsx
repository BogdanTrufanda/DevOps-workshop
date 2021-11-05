import { Box } from "@mui/material";

import { MainbarActions } from "./MainbarActions";
import { MainbarLogo } from "./MainbarLogo";

export const Mainbar = () => {
  return (
    <Box
      px={4}
      py={2}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      sx={{ userSelect: "none" }}
    >
      <MainbarLogo />
      <MainbarActions />
    </Box>
  );
};
