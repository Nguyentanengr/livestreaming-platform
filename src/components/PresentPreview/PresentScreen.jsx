
import { PresentScreenContainer } from "./PresentScreen.styled";

const PresentScreen = ( { videoRef } ) => {

    return (
        <PresentScreenContainer>
            <video ref={ videoRef } autoPlay controls></video>
            <div className="live">live</div>
        </PresentScreenContainer>
    )
}

export default PresentScreen;