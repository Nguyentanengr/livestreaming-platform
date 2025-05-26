

import { useState } from "react";
import { EditSelectContainer } from "./EditSelect.styled";
import { Icons } from "../../assets/icons/Icon";
import { useEffect } from "react";
import { useRef } from "react";

const EditSelect = ({ options, selected, onClickItem }) => {

    const [isExpanded, setIsExpanded] = useState(false);
    const optionRef = useRef(null);

    const handleClickItem = (index) => {
        setIsExpanded(false);
        onClickItem(index);
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (optionRef.current && !optionRef.current.contains(event.target)) {
                setIsExpanded(false);
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);


    return (
        <EditSelectContainer>
            <div className={`select ${isExpanded ? "highlight" : ""}`} onClick={() => setIsExpanded(true)}>
                <div className="text">
                    {selected}
                </div>
                <div className="dropdown-icon">
                    <Icons.ShowMore />
                </div>
            </div>
            {isExpanded && <div className="option-box" ref={optionRef}>
                {options.map((option, index) => (
                    <div className="option-item" key={index} onClick={() => handleClickItem(index)}>
                        {option}
                    </div>
                ))}
            </div>}
        </EditSelectContainer>
    );
};

export default EditSelect;