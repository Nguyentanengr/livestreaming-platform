import { ThumbnailContainer } from "./Thumbnail.styled";
const Thumbnail = ({ src, onclick, size }) => {
    return (
        <ThumbnailContainer onClick={onclick}>
            <img src={src} alt="thumbnail" className={size} />
        </ThumbnailContainer>
    )
}

export default Thumbnail;
