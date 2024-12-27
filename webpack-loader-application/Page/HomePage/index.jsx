import Avatar from "./components/Avatar"
import { 
  StyledContainer, 
  StyledCard,
  Name, 
  Subtitle, 
  Description,
  CardContent 
} from "./styles"

export default function HomePage({ size = 80 }) {
  return (
    <StyledContainer>
      <StyledCard width={320} isRounded>
        <CardContent>
          <Avatar src="/happyCat.jpg" alt="Profile Avatar" size={size} />
          <Name marginBottom={4}>Noah Hong</Name>
          <Subtitle>Cursor Engineer</Subtitle>
          <Description fontSize={`${14}px`}>
            A passionate Cursor Engineer, I specialize in pressing tab and let AI finish the code.
            I like to sleep all day, do nothing and let AI do everything. Can&apos;t work without AI.
          </Description>
        </CardContent>
      </StyledCard>
    </StyledContainer>
  )
}