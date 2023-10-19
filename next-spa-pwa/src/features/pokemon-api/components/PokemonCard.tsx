import Image from "next/image";
import styled from "styled-components";

interface PokemonCardProps {
  name: string;
  image?: string;
}

const StyledPokemonCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PokemonCard = ({ name, image }: PokemonCardProps) => {
  return (
    <StyledPokemonCard>
      <h2>{name}</h2>
      <Image
        priority
        src={image ?? "/images/cliff.jpg"}
        // className={utilStyles.borderCircle}
        height={144}
        width={144}
        alt=""
      />
    </StyledPokemonCard>
  );
};

export default PokemonCard;
