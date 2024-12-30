const absolute = () => {};

const NestedComponent = styled.div`
  ${(props) => `
        padding: ${props.size}px;
        margin: ${() => `${props.margin}px`};
    `}
  ${({ theme }) =>
    theme.isMobile &&
    `
        font-size: 14px;
        line-height: ${() => "16px"};
        width: ${() => `600px`};
    `}
    ${() => {
    const size = "16px";
    const base_margin = "12px";
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
  ${() => `
    ${(props) => `
      margin: ${props.margin}px;
    `}
  `}
  ${absolute({ top: "3px", left: "2px", zIndex: 1 })};
`;