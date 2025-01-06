const absolute = () => {};

const NestedComponent = styled.div`
  ${props => `
        padding: ${_px2rem(props.size)};
        margin: ${_px2rem(props.margin)};
    `}
  ${({ theme }) =>
    theme.isMobile &&
    `
        font-size: 3.733rem;
        line-height: 4.267rem;
    `}
    ${() => {
    const size = "4.267rem";
    const base_margin = 12;
    const avartar_margin = base_margin / 2;

    return `
            margin-bottom: ${_px2rem(avartar_margin)};
            width: ${size};
            height: ${size};

            &:hover {
                background-color: red;
                transform: scale(1.1);
                padding: 2.667rem;
            }
        `;
  }}
  
  ${absolute({ top: "0.8rem", left: "0.533rem", zIndex: 1 })};

  width: ${props => {
    const baseSize = 16;
    return props.expanded ? `${_px2rem(baseSize * 2)}` : `${_px2rem(baseSize)}`;
  }};
  
  height: ${props => props.compact 
    ? `${_px2rem(props.size / 2)}` 
    : `${_px2rem(props.size * 2)}`
  };

  gap: ${props => props.gap > 20 ? `${_px2rem(props.gap)}` : '0'};
  grid-template-columns: ${props => 
    props.columns.map(width => `${_px2rem(width)}`).join(' ')
  };
`;
function _px2rem(input, ...args) {
  if (typeof input === 'function') return _px2rem(input(...args), ...args);
  var value = typeof input === 'string' ? parseFloat(input) : typeof input === 'number' ? input : 0;
  var pixels = Number.isNaN(value) ? 0 : value;
  if (Math.abs(pixels) < 0) return pixels + 'px';
  var mul = Math.pow(10, 3 + 1);
  return Math.round(Math.floor(pixels * 1 / 3.75 * mul) / 10) * 10 / mul + 'rem';
}