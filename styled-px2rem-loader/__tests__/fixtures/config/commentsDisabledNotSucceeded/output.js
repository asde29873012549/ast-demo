/* eslint-disable */
// styled-px2rem-disable

const Component = ({ margin = "5.867rem" }) => {
  return <div style={{ padding: "2.667rem" }} margin={margin}>Hello</div>;
};


const StyledComponent = styled(Component)`
  padding: 2.667rem;
  width: 100%;
  height: 26.667rem;
`;

