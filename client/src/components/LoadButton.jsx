import { LoadingButton } from "@mui/lab";
import styled from "styled-components";

const LoadButton = styled(LoadingButton)`
    color: #644518 !important;
    border-color: #ae7929 !important;
    font-size: 12px !important;
    width: 85px !important;
    height: 30px !important;
    &:hover {
      background-color: #fabd62 !important;
    }

    @media (min-width: 600px) {
    width: 100px !important;
    height: 35px !important;
    font-size: 15px !important;
  }
`;

export default LoadButton;