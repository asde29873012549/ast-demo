const Component = ({ margin, borderWidth, hasShadow, data }) => {
  const [height, setHeight] = useState("0px");
  const padding = "12px";
  const customMargin = margin || "12px";
  const border = `${borderWidth}px solid #C69120`;
  const shadow = hasShadow ? "0 0 10px rgba(0, 0, 0, 0.1)" : "";

  useEffect(() => {
    const customHeight = "12px";
    setHeight(customHeight);
  }, []);

  if (!height || height === "0px") {
    setHeight("999px");
  }

  return (
    <div>
      <div margin={customMargin} padding={padding || "6px"} border={border} shadow={shadow} />
      {data.map((item) => {
        const fontSize = `${item.fontSize}px` || "12px";
        return <div fontSize={fontSize} {...(item.width ? { width: `${item.width}px` } : {})}/>
      })}
    </div>
  )
}
