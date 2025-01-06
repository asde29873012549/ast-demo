/* eslint-disable */
function Component() {
    return (
      <div p="4rem">
        {/* These are non-attribute expressions */}
        {`16px`}
        {size + "px"}
        {calculateSize(24) + "px"}
        {condition ? "123px" : "2.133rem"}
        {items.map(item => `${item.size}px`)}
        
        <div style={{ padding: "4.267rem" }} />
      </div>
    );
  }