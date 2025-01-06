const NestedInterpolation = styled.div`
  ${() => `
    ${(props) => `
      margin: ${props.margin}px;
    `}
  `}

  ${StyledButton} {
    margin: 8px;
    
    &:hover {
      padding: ${props => props.compact ? "4px" : "8px"};
    }
  }
`;