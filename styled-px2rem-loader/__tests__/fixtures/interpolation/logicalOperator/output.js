const Interpolation = styled.div`
  font-size: ${({ $fontSize }) => $fontSize || "3.2rem"};
  padding: ${(props) => props.padding || "4.267rem"};
  line-height: 1.6;
  color: #636e72;
  margin: 0;
  text-align: center;

  ${({ variant }) => variant === 'compact' && `
    padding: 2.133rem;
    margin: 1.067rem;
  `}

  ${({ theme }) => theme.isDarkMode && css`
    border: 0.533rem solid #fff;
    box-shadow: 0 1.067rem 2.133rem rgba(0, 0, 0, 0.2);
  `}
`;
