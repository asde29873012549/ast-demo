import styled from "styled-components";

const Avatar = ({ className, src, alt }) => {
  return (
    <div className={className}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} />
    </div>
  );
};

export default styled(Avatar)`
  width: ${({ $size }) => `${$size}px`};
  height: ${({ $size }) => `${$size}px`};
  margin-bottom: ${({ $size }) => {
    return `${$size / 5}px`
  }};
`;
