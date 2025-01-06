const StyledComponent = styled.div`
  padding: ${props => props.size}px;
  margin: ${getDynamicValue()}px;
  width: ${calculateWidth(16)}px;
`;

function Component() {
  return (
    <div>
      {`${getDynamicSize()}px`}
      <span>{calculateMargin(8) + "px"}</span>
    </div>
  );
} 