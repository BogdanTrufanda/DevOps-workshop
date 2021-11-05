import { Box, ButtonBase, Link } from "@mui/material";
import { ShorelineLogo } from "./ShorelineLogo";

export const MainbarLogo = () => {
  return (
    <Box display="flex" alignItems="center" gap={10}>
      <Box fontSize={18} fontWeight="bold">
        Code Editor
      </Box>

      <Box
        fontSize={8}
        display="flex"
        alignItems="center"
        whiteSpace="nowrap"
        gap={2}
      >
        <Box lineHeight={0.9} textAlign="right" sx={{ opacity: 0.5 }}>
          powered
          <br />
          by
        </Box>

        <ButtonBase
          LinkComponent={Link}
          disableRipple
          href="https://shoreline.io"
          target="_blank"
          sx={{ opacity: 0.75, "&:hover": { opacity: 1 } }}
        >
          <ShorelineLogo height={14} />
        </ButtonBase>
      </Box>
    </Box>
  );
};
