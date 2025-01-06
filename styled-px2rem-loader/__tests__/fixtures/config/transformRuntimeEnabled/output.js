const StyledComponent = styled.div`
  padding: ${props => _px2rem(props.size)};
  margin: ${_px2rem(getDynamicValue())};
  width: ${_px2rem(calculateWidth(16))};
`;

function Component() {
  return (
    <div>
      {`${_px2rem(getDynamicSize())}`}
      <span>{calculateMargin(8) + "px"}</span>
    </div>
  );
}
function _px2rem(input, ...args) {
  if (typeof input === 'function') return _px2rem(input(...args), ...args);
  var value = typeof input === 'string' ? parseFloat(input) : typeof input === 'number' ? input : 0;
  var pixels = Number.isNaN(value) ? 0 : value;
  if (Math.abs(pixels) < 0) return pixels + 'px';
  var mul = Math.pow(10, 3 + 1);
  return Math.round(Math.floor(pixels * 1 / 3.75 * mul) / 10) * 10 / mul + 'rem';
}