import styled from "styled-components";

import Box, { IBox } from "./Box";

const Row = styled(Box)<IBox>`
  display: flex;
  flex-direction: row;
`;

export default Row;
