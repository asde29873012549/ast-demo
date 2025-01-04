/* eslint-disable */
const Interpolation = styled.div`
  width: ${({ width }) => (width ? px2Unit(width) : "100%")};
  padding: 24px;
  border-radius: ${({ isRounded, borderRadius }) =>
    isRounded ? px2Unit(borderRadius) : "8px"};
  background-color: white;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
  transform: scale(1);
  transition: transform 0.3s ease-in-out;
  margin: ${(props) =>
    props.size > 10 ? px2Unit(props.size * 2) : px2Unit(props.size)};

  &:hover {
    transform: scale(1.05) translateX(6px);
  }
`