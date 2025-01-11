/* eslint-disable */
/* styled-px2rem-disable */

const Component = ({ margin = "22px" }) => {
  return <div style={{ padding: "10px" }} margin={margin}>Hello</div>;
};


const StyledComponent = styled(Component)`
  padding: 10px;
  width: 100%;
  height: 100px;
`;
