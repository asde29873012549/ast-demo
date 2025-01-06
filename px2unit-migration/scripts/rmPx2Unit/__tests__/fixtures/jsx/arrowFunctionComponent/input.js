/* eslint-disable */
const ComponentA = () => {
  const padding = px2Unit(12);

  return (
    <div padding={padding} />
  )
}

const ComponentB = () => (
  <div padding={padding} margin={px2Unit(12)}/>
)