function Component() {
  return (
    <div p="4rem">
      {/* These are non-attribute expressions */}
      {`${_px2rem(16)}`}
      {size + "px"}
      {calculateSize(24) + "px"}
      {condition ? "3.2rem" : "2.133rem"}
      {items.map(item => `${_px2rem(item.size)}`)}
      
      <div style={{ padding: "4.267rem" }} />
    </div>
  );
}
function _px2rem(input, ...args) {
  if (typeof input === 'function') return _px2rem(input(...args), ...args);
  var value = typeof input === 'string' ? parseFloat(input) : typeof input === 'number' ? input : 0;
  var pixels = Number.isNaN(value) ? 0 : value;
  if (Math.abs(pixels) < 0) return pixels + 'px';
  var mul = Math.pow(10, 3 + 1);
  return Math.round(Math.floor(pixels * 1 / 3.75 * mul) / 10) * 10 / mul + 'rem';
} 