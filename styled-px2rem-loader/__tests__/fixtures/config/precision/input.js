const PreciseComponent = styled.div`
  /* Testing different precisions */
  margin: 15px;
  padding: 7.5px;
  border: 3.333px solid black;
  
  width: ${props => props.width}px;
  height: ${props => Math.floor(props.height / 3)}px;
`; 