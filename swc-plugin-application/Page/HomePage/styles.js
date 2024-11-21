import styled from "styled-components"

export const StyledContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #B5495B;
  
  display: flex;
  justify-content: center;
  align-items: center;
`

export const StyledCard = styled.div`
  width: ${({ width }) => width ? `${width}px` : "100%"};
  padding: 24px;
  border-radius: ${({ $isRounded }) => $isRounded ? "16px" : "8px"};
  background-color: white;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
  transform: scale(1);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05) translateX(6px);
  }
`

export const Name = styled.h2`
  font-size: ${48 / 2}px;
  font-weight: 600;
  color: #2D3436;
  margin: 0;
  margin-bottom: ${({ $marginBottom }) => `${Math.min(2, $marginBottom)}px`};
`

export const Subtitle = styled.h3`
  font-size: 16px;
  color: #636E72;
  margin: 0;
  margin-bottom: 16px;
  font-weight: 500;
`

export const Description = styled.p`
  font-size: ${({ $fontSize }) => $fontSize || "12px"};
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