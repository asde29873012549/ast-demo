/* eslint-disable */
const Component = () => {
  return (
    <div>
      {data.map((item) => {
        const margin = px2Unit(12);
        const padding = `${px2Unit(item.paddingLeft)} ${px2Unit(item.paddingRight)}`;
        return <div margin={margin} padding={padding} />;
      })}
    </div>
  );
};
