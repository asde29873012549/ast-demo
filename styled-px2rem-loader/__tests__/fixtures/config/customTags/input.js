const Component = customStyled.div`
  padding: 16px;
  margin: ${props => props.margin}px;
`;

const GlobalStyle = myGlobalStyle`
  body {
    font-size: 14px;
    line-height: 16px;
  }
`; 

const CustomStyled = createGlobalStyle`
  body {
    font-size: 14px;
    line-height: 16px;
  }
`;