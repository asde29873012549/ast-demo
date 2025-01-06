const absolute = () => {};

const NestedComponent = styled.div`
  ${(props) => `
        padding: ${props.size}px;
        margin: ${props.margin}px;
    `}
  ${({ theme }) =>
    theme.isMobile &&
    `
        font-size: 14px;
        line-height: 16px;
    `}
    ${() => {
    const size = "16px";
    const base_margin = 12;
    const avartar_margin = base_margin / 2;

    return `
            margin-bottom: ${avartar_margin}px;
            width: ${size};
            height: ${size};

            &:hover {
                background-color: red;
                transform: scale(1.1);
                padding: 10px;
            }
        `;
  }}
  
  ${absolute({ top: "3px", left: "2px", zIndex: 1 })};

  width: ${props => {
    const baseSize = 16;
    return props.expanded ? `${baseSize * 2}px` : `${baseSize}px`;
  }};
  
  height: ${props => props.compact 
    ? `${props.size / 2}px` 
    : `${props.size * 2}px`
  };

  gap: ${props => props.gap > 20 ? `${props.gap}px` : '0'};
  grid-template-columns: ${props => 
    props.columns.map(width => `${width}px`).join(' ')
  };
`;
