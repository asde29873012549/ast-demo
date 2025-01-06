/* eslint-disable */
const Component = () => (
  <div>
    {data.map((item) => {
      const margin = "3.2rem"
      const padding = `${_px2rem(item.paddingLeft)} ${_px2rem(item.paddingRight)}`
      return <div margin={margin} padding={padding}/>
    })}
  </div>
)
function _px2rem(input, ...args) {
  if (typeof input === 'function') return _px2rem(input(...args), ...args);
  var value = typeof input === 'string' ? parseFloat(input) : typeof input === 'number' ? input : 0;
  var pixels = Number.isNaN(value) ? 0 : value;
  if (Math.abs(pixels) < 0) return pixels + 'px';
  var mul = Math.pow(10, 3 + 1);
  return Math.round(Math.floor(pixels * 1 / 3.75 * mul) / 10) * 10 / mul + 'rem';
}