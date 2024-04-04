import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)`
  color: #644518;
  text-decoration: none;
  font-size: 12px !important;

  &:hover {
    color: #ff6347;
    text-decoration: underline;
    text-underline-offset: 4px;
  }

  @media (min-width: 600px) {
    font-size: 17px !important;
  }
`;

export default StyledLink;