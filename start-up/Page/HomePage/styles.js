import styled from "styled-components"
import { px2Unit } from "@/styles/utils"

export const StyledContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #B5495B;
  
  display: flex;
  justify-content: center;
  align-items: center;
`

export const StyledCard = styled.div`
  width: ${({ width }) => width ? px2Unit(width) : "100%"};
  padding: ${px2Unit(24)};
  border-radius: ${({ $isRounded }) => $isRounded ? px2Unit(16) : px2Unit(8)};
  background-color: white;
  box-shadow: 0 ${px2Unit(12)} ${px2Unit(24)} rgba(0, 0, 0, 0.12);
  transform: scale(1);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05) translateX(${px2Unit(6)});
  }
`

export const Name = styled.h2`
  font-size: ${px2Unit(48 / 2)};
  font-weight: 600;
  color: #2D3436;
  margin: 0;
  margin-bottom: ${({ $marginBottom }) => px2Unit(Math.min(2, $marginBottom))};
`

export const Subtitle = styled.h3`
  font-size: ${px2Unit(16)};
  color: #636E72;
  margin: 0;
  margin-bottom: ${px2Unit(16)};
  font-weight: 500;
`

export const Description = styled.p`
  font-size: ${({ $fontSize }) => $fontSize || px2Unit(12)};
  line-height: 1.6;
  color: #636E72;
  margin: 0;
  text-align: center;
`

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`