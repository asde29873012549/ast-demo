/* eslint-disable */
const Component = ({ margin, borderWidth, hasShadow, data }) => {
  const [height, setHeight] = useState(px2Unit(0));
  const padding = px2Unit(12);
  const customMargin = margin || px2Unit(12);
  const border = `${px2Unit(borderWidth)} solid #C69120`;
  const shadow = hasShadow ? `0 0 ${px2Unit(10)} rgba(0, 0, 0, 0.1)` : "";

  useEffect(() => {
    const customHeight = px2Unit(12);
    setHeight(customHeight);
  }, []);

  if (!height || height === px2Unit(0)) {
    setHeight(px2Unit(999));
  }

  return (
    <div>
      <div margin={customMargin} padding={padding || px2Unit(6)} border={border} shadow={shadow} />
      {data.map((item) => {
        const fontSize = `${px2Unit(item.fontSize)}` || px2Unit(12);
        return <div fontSize={fontSize} {...(item.width ? { width: `${px2Unit(item.width)}` } : {})}/>;
      })}
    </div>
  );
}
