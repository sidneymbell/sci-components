import React, { forwardRef } from "react";
import { PanelBasicExtraProps, StyledPanelBasic } from "./style";

export type PanelBasicProps = PanelBasicExtraProps;

/**
 * @see https://mui.com/material-ui/react-drawer/#persistent-drawer
 */
const PanelBasic = forwardRef<HTMLSpanElement, PanelBasicExtraProps>(
  (props, ref) => {
    return <StyledPanelBasic ref={ref} {...props} />;
  }
);

export default PanelBasic;
