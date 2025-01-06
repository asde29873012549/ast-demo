/* eslint-disable */
function Component() {
    return (
      <div p="4rem">
        {/* These are non-attribute expressions */}
        {`${px2Unit(16)}`}
        {size + "px"}
        {calculateSize(24) + "px"}
        {condition ? px2Unit(123) : "2.133rem"}
        {items.map(item => `${px2Unit(item.size)}`)}
        
        <div style={{ padding: "4.267rem" }} />
      </div>
    );
  }