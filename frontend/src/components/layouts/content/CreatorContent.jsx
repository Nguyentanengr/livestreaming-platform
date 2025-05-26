import { CreatorContentContainer } from "./CreatorContent.styled";

const CreatorContent = ({ children }) => {
    return (
        <CreatorContentContainer>
            {children}
        </CreatorContentContainer>
    )
}

export default CreatorContent;