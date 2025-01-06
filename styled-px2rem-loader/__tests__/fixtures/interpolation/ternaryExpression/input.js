const Interpolation = styled.div`
  width: ${({ width }) => (width ? `${width}px` : "100%")};
  padding: 24px;
  border-radius: ${({ isRounded, borderRadius }) =>
    isRounded ? `${borderRadius}px` : "8px"};
  background-color: white;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
  transform: scale(1);
  transition: transform 0.3s ease-in-out;
  margin: ${(props) =>
    props.size > 10 ? `${props.size * 2}px` : `${props.size}px`};

  &:hover {
    transform: scale(1.05) translateX(6px);
  }

  ${({ theme, size }) => theme.isMobile ? `
    padding: ${size || 16}px;
    margin: ${theme.spacing.small}px;
    font-size: 14px;
  ` : `
    padding: ${size || 24}px;
    margin: ${theme.spacing.large}px;
    font-size: 16px;
  `}
`;
