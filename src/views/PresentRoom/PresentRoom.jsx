import { PresentRoomContainer } from "./PresentRoom.styled";

import PresentPreview from "../../components/PresentPreview/PresentPreview";
import ChatPreview from "../../components/ChatPreview/ChatPreview";
import { useEffect } from "react";
import ScrollToTop from "../../components/Share/ScrollToTop";
import ActionPreview from "../../components/ActionPreview/ActionPreview";

const PresentRoom = () => {

    useEffect(() => {
        // Thêm lớp `no-scroll` vào body khi vào trang
        document.body.classList.add("no-scroll");
        document.querySelector(".main").classList.add("main-ex");
        document.querySelector(".main").classList.remove("main");

        // Gỡ bỏ lớp `no-scroll` khi rời khỏi trang
        return () => {
            document.body.classList.remove("no-scroll");
            document.querySelector(".main-ex").classList.add("main");
            document.querySelector(".main-ex").classList.remove("main-ex");
        };
    }, []);

    return (
        <>
            <ScrollToTop />
            <PresentRoomContainer>
                <PresentPreview />
                <ChatPreview />
                <ActionPreview />
            </PresentRoomContainer>
        </>
    )
}

export default PresentRoom;