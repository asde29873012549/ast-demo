/* eslint-disable */
const Component = () => (
  <div
    style={{
      padding: isLarge ? px2Unit(padding) : px2Unit(16),
      margin: isMobile && px2Unit(8),
    }}
  />
);
