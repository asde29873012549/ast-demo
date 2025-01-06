function Component() {
  return (
    <div p="15px">
      {/* These are non-attribute expressions */}
      {`${16}px`}
      {size + "px"}
      {calculateSize(24) + "px"}
      {condition ? "12px" : "8px"}
      {items.map(item => `${item.size}px`)}
      
      <div style={{ padding: "16px" }} />
    </div>
  );
} 