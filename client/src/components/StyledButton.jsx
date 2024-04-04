import { Button } from "@mui/material";
import styled from "styled-components";

const StyledButton = styled(Button)`
    font-size: 0.8rem !important;
    color: #7d571e !important;
    background-color: #fbc676 !important;

    @media (min-width: 600px) {
    font-size: 1.5rem !important;
    background-color: transparent !important;
  }
`;

export default StyledButton;