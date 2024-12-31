/* eslint-disable */
const Interpolation = styled(Avatar)`
  margin: ${size}px;
  padding-top: -10px;
  padding: 8px ${(props) => `${props.paddingHorizontal}px`};
  border: 1px solid #000;
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  font-size: ${14 / 2}px;
  margin-bottom: ${({ size }) => {
    return `${size / 4}px`;
  }};
`