const Interpolation = styled.div`
  font-size: ${({ $fontSize }) => $fontSize || "12px"};
  padding: ${(props) => props.padding || "16px"};
  line-height: 1.6;
  color: #636e72;
  margin: 0;
  text-align: center;

  ${({ variant }) => variant === 'compact' && `
    padding: 8px;
    margin: 4px;
  `}

  ${({ theme }) => theme.isDarkMode && css`
    border: 2px solid #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  `}
`;
