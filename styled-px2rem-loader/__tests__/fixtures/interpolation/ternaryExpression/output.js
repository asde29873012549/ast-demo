const Interpolation = styled.div`
  width: ${({ width }) => (width ? `${_px2rem(width)}` : "100%")};
  padding: 6.4rem;
  border-radius: ${({ isRounded, borderRadius }) =>
    isRounded ? `${_px2rem(borderRadius)}` : "2.133rem"};
  background-color: white;
  box-shadow: 0 3.2rem 6.4rem rgba(0, 0, 0, 0.12);
  transform: scale(1);
  transition: transform 0.3s ease-in-out;
  margin: ${props =>
    props.size > 10 ? `${_px2rem(props.size * 2)}` : `${_px2rem(props.size)}`};

  &:hover {
    transform: scale(1.05) translateX(1.6rem);
  }

  ${({ theme, size }) => theme.isMobile ? `
    padding: ${_px2rem(size || 16)};
    margin: ${_px2rem(theme.spacing.small)};
    font-size: 3.733rem;
  ` : `
    padding: ${_px2rem(size || 24)};
    margin: ${_px2rem(theme.spacing.large)};
    font-size: 4.267rem;
  `}
`;
function _px2rem(input, ...args) {
  if (typeof input === 'function') return _px2rem(input(...args), ...args);
  var value = typeof input === 'string' ? parseFloat(input) : typeof input === 'number' ? input : 0;
  var pixels = Number.isNaN(value) ? 0 : value;
  if (Math.abs(pixels) < 0) return pixels + 'px';
  var mul = Math.pow(10, 3 + 1);
  return Math.round(Math.floor(pixels * 1 / 3.75 * mul) / 10) * 10 / mul + 'rem';
}