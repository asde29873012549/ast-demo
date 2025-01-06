/* eslint-disable */
const Component = () => (
  <div>
    {123 ? (
      <div
        pl={px2Unit(12)}
        border={`${px2Unit(10)} solid #C69120`}
      />
    ) : (
      <span style={{ margin: px2Unit(10) }}>test</span>
    )}
  </div>
);
