import Image from "next/image";
import styled from "styled-components";

type FeedItemCardProps = {
  title: string;
  image?: string;
};

const StyledFeedItemCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FeedItemCard = ({ title, image }: FeedItemCardProps) => {
  return (
    <StyledFeedItemCard>
      <h2>{title}</h2>
      <Image
        priority
        src={image ?? "/images/cliff.jpg"}
        height={144}
        width={144}
        alt=""
      />
    </StyledFeedItemCard>
  );
};

export default FeedItemCard;
