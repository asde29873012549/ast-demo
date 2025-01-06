const Component = ({ margin, borderWidth, hasShadow, data }) => {
  const [height, setHeight] = useState("0");
  const padding = "3.2rem";
  const customMargin = margin || "3.2rem";
  const border = `${_px2rem(borderWidth)} solid #C69120`;
  const shadow = hasShadow ? "0 0 2.667rem rgba(0, 0, 0, 0.1)" : "";

  useEffect(() => {
    const customHeight = "3.2rem";
    setHeight(customHeight);
  }, []);

  if (!height || height === "0") {
    setHeight("266.4rem");
  }
  
  return (
    <div>
      <div margin={customMargin} padding={padding || "1.6rem"} border={border} shadow={shadow} />
      {data.map((item) => {
        const fontSize = `${_px2rem(item.fontSize)}` || "3.2rem";
        return <div fontSize={fontSize} {...(item.width ? { width: `${_px2rem(item.width)}` } : {})}/>
      })}
    </div>
  )
}
function _px2rem(input, ...args) {
  if (typeof input === 'function') return _px2rem(input(...args), ...args);
  var value = typeof input === 'string' ? parseFloat(input) : typeof input === 'number' ? input : 0;
  var pixels = Number.isNaN(value) ? 0 : value;
  if (Math.abs(pixels) < 0) return pixels + 'px';
  var mul = Math.pow(10, 3 + 1);
  return Math.round(Math.floor(pixels * 1 / 3.75 * mul) / 10) * 10 / mul + 'rem';
}
  