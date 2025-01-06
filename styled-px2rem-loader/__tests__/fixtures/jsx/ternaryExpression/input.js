/* eslint-disable */
const Component = () => (
  <div>
    {123 ? (
      <div
        pl="12px"
        border={`10px solid #C69120`}
      />
    ) : (
      <span style={{ margin: "10px" }}>test</span>
    )}
  </div>
)