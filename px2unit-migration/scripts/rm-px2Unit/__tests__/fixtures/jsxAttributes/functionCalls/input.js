const getPadding = (value) => value;
const calculateSpacing = (value) => value;

<div
  style={{
    padding: getPadding(px2Unit(16)),
    margin: px2Unit(calculateSpacing(8)),
  }}
/>;

