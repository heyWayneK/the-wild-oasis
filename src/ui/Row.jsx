import styled, { css } from "styled-components";

const Row = styled.div`
  display: flex;
  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between;
      gap: 2rem;
    `}
  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 2rem;
    `}
`;

// A react function, not Styled-Components
Row.defaultProps = {
  type: "vertical",
};

export default Row;
