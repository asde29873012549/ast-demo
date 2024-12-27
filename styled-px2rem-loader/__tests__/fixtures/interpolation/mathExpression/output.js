const Dynamic = styled.div`
  margin: ${props => _px2rem(props.margin)};
  padding: ${({ size }) => _px2rem(size * 2)};
  width: ${_px2rem(48 / 2)};
  height: ${_px2rem(48 && 7)};
  font-size: ${() => _px2rem(Math.min(16, 24))};
`;
function _px2rem(input, ...args) {
  if (typeof input === 'function') return _px2rem(input(...args), ...args);
  var value = typeof input === 'string' ? parseFloat(input) : typeof input === 'number' ? input : 0;
  var pixels = Number.isNaN(value) ? 0 : value;
  if (Math.abs(pixels) < 0) return pixels + 'px';
  var mul = Math.pow(10, 3 + 1);
  return Math.round(Math.floor(pixels * 1 / 3.75 * mul) / 10) * 10 / mul + 'rem';
}