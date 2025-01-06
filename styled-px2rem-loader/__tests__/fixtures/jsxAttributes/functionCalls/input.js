const getPadding = (value) => value;
const calculateSpacing = (value) => value;

const Component = () => (
  <div
    style={{
      padding: getPadding("16px"),
      margin: calculateSpacing(8) + "px",
    }}
  />
);
