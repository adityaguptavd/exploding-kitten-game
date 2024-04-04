import { InputBase } from "@mui/material";
import styled from "styled-components";

const Input = styled(InputBase)`
  border: 1px solid #ae7929;
  background-color: #fabd62;
  padding: 10px;
  border-radius: 5px;
  color: #644518;
  width: 170px;
  height: 32px;
  font-size: 12px !important;

  @media (min-width: 600px) {
    width: 214px;
    height: 52px;
    font-size: 17px !important;
  }
`;


export default Input;