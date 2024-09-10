import React from "react";
import styled from "styled-components";

const BackgroundFadeContainer = styled.div`
  position: absolute;
  width: 100%;
  min-height: 100vh;
  background: radial-gradient(#222, transparent);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export const BackgroundFade = () => <BackgroundFadeContainer />