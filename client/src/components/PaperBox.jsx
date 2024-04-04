import styled from "styled-components";
import { Paper } from "@mui/material";

const PaperBox = styled(Paper)`
    color: #644518;
    background-color: #fbc676 !important;
    width: 250px;
    height: 450px;
    margin-top: 50px !important;

    @media (min-width: 600px) {
        width: 350px;
        height: 550px;
    }

    @media (min-width: 900px) {
        width: 480px;
        height: 600px;
    }
`;

export default PaperBox;
