const absolute = () => {};

const NestedComponent = styled.div`
  ${(props) => `
        padding: ${px2Unit(props.size)};
        margin: ${() => `${px2Unit(props.margin)}`};
    `}
  ${({ theme }) =>
    theme.isMobile &&
    `
        font-size: ${px2Unit(14)};
        line-height: ${() => px2Unit(16)};
        width: ${() => `${px2Unit(600)}`};
    `}
    ${() => {
    const size = px2Unit(16);
    const base_margin = px2Unit(12);
    const avartar_margin = base_margin / 2;

    return `
            margin-bottom: ${px2Unit(avartar_margin)};
            width: ${size};
            height: ${size};

            &:hover {
                background-color: red;
                transform: scale(1.1);
                padding: ${px2Unit(10)};
            }
        `;
  }}
  ${() => `
    ${(props) => `
      margin: ${px2Unit(props.margin)};
    `}
  `}
  ${absolute({ top: px2Unit(3), left: px2Unit(2), zIndex: 1 })};
`;
