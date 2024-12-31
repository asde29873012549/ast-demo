/* eslint-disable */
const Interpolation = styled(Avatar)`
  margin: ${px2Unit(size)};
  padding-top: ${px2Unit(10)};
  padding: 8px ${(props) => px2Unit(props.paddingHorizontal)};
  border: ${px2Unit(1)} solid #000;
  width: ${({ size }) => px2Unit(size)};
  height: ${({ size }) => px2Unit(size)};
  font-size: ${px2Unit(14 / 2)};
  margin-bottom: ${({ size }) => {
    return px2Unit(size / 4);
  }};
`