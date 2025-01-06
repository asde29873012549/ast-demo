const Component = () => (
  <div
    style={{ padding: "16px", margin: "8px" }}
    p={`${pt} 16px`}
    m={() => {
        const pb = "16px";
        return `${mt} 8px ${pb}`;
    }}
  />
);
