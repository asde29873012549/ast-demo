const Component = customStyled.div`
  padding: 4.267rem;
  margin: ${props => _px2rem(props.margin)};
`;

const GlobalStyle = myGlobalStyle`
  body {
    font-size: 3.733rem;
    line-height: 4.267rem;
  }
`;

const CustomStyled = createGlobalStyle`
  body {
    font-size: 14px;
    line-height: 16px;
  }
`;
function _px2rem(input, ...args) {
  if (typeof input === 'function') return _px2rem(input(...args), ...args);
  var value = typeof input === 'string' ? parseFloat(input) : typeof input === 'number' ? input : 0;
  var pixels = Number.isNaN(value) ? 0 : value;
  if (Math.abs(pixels) < 0) return pixels + 'px';
  var mul = Math.pow(10, 3 + 1);
  return Math.round(Math.floor(pixels * 1 / 3.75 * mul) / 10) * 10 / mul + 'rem';
} 