/* eslint-disable */
const Component = () => (
  <div>
    {data.map((item) => {
      const margin = "12px"
      const padding = `${item.paddingLeft}px ${item.paddingRight}px`
      return <div margin={margin} padding={padding}/>
    })}
  </div>
)
