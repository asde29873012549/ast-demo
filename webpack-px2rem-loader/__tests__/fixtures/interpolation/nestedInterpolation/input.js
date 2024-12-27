const NestedInterpolation = styled.div`
  ${() => `
    ${(props) => `
      margin: ${props.margin}px;
    `}
  `}
`;