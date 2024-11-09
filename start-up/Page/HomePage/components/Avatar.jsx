import styled from "styled-components";
import { px2Unit } from "@/styles/utils";

const Avatar = ({ className, src, alt }) => {
  return (
    <div className={className}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} />
    </div>
  );
};

export default styled(Avatar)`
  width: ${({ $size }) => px2Unit($size)};
  height: ${({ $size }) => px2Unit($size)};
  margin-bottom: ${({ $size }) => {
    return px2Unit($size / 5)
  }};
`;
