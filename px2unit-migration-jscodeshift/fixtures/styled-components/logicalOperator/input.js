/* eslint-disable */
const Interpolation = styled.div`
  font-size: ${({ fontSize }) => px2Unit(fontSize || 12)};
  padding: ${(props) => px2Unit(props.padding || 16)};
  line-height: 1.6;
  color: #636e72;
  margin: 0;
  text-align: center;
`