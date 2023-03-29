import Drawer, { DrawerProps } from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";
import React from "react";

import {
  CommonThemeProps,
  fontBodyXxs,
  getColors,
  getSpaces,
} from "../styles";

import { Spaces } from "../styles/common/constants/spaces";
import { Gray } from "../styles/common/constants/gray";

export interface PanelBasicExtraProps {
  panelContent: React.ReactNode; 
  headerPaddingHeight?: number;
  panelWidth?: number;
}

const StyledPanelBasic = styled(Drawer)<DrawerProps>(() => (
  {
  flexShrink: 0,
  position: "relative",
  "& .MuiDrawer-paper": {
    boxSizing: "border-box",
    padding: Spaces.L
  },
  "& .MuiDrawer-paperAnchorLeft": {
    borderRight: `2px solid ${Gray.LIGHTEST}`,
  },
  "& .MuiDrawer-paperAnchorRight": {
    borderLeft: `2px solid ${Gray.LIGHTEST}`,
  },
}));

export const PanelBasic = ({
  panelContent,
  headerPaddingHeight,
  panelWidth,
  ...rest
}: PanelBasicExtraProps) => {

  return (
    <StyledPanelBasic
      variant="persistent",
      {...rest}
    >
      {/* Padding optionally acts as a top gutter so as to not overlap header. */}
      <div style={{ paddingTop: headerPaddingHeight || 0, width: panelWidth }}>
        {panelContent}
      </div>
    </StyledPanelBasic>
  );
};

export default PanelBasic;
