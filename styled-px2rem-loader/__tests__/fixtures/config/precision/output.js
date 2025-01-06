const PreciseComponent = styled.div`
  /* Testing different precisions */
  margin: 0.9375rem;
  padding: 0.46875rem;
  border: 0.20831rem solid black;
  
  width: ${props => _px2rem(props.width)};
  height: ${props => _px2rem(Math.floor(props.height / 3))};
`;
function _px2rem(input, ...args) {
  if (typeof input === 'function') return _px2rem(input(...args), ...args);
  var value = typeof input === 'string' ? parseFloat(input) : typeof input === 'number' ? input : 0;
  var pixels = Number.isNaN(value) ? 0 : value;
  if (Math.abs(pixels) < 0) return pixels + 'px';
  var mul = Math.pow(10, 5 + 1);
  return Math.round(Math.floor(pixels * 1 / 16 * mul) / 10) * 10 / mul + 'rem';
} 