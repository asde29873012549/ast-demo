const getPadding = (value) => value;
const calculateSpacing = (value) => value;

const Component = () => (
  <div
    style={{
      padding: getPadding("4.267rem"),
      margin: calculateSpacing(8) + "px",
    }}
  />
);
