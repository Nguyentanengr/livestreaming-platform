import React, { Component } from "react";
import PropTypes from "prop-types";
import { TooltipContainer } from "./Tooltip.styled";

export default class Tooltip extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
        }
        this.handleMouseIn = this.handleMouseIn.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
    }

    handleMouseIn() {
        this.setState({ show: true });
    }

    handleMouseOut() {
        this.setState({ show: false });
    }

    render() {
        return (
            <TooltipContainer>
                <div className="tooltip" onMouseOver={this.handleMouseIn} onMouseLeave={this.handleMouseOut}>
                    {this.state.show && <div className={`tooltip-content ${this.props.position}`}>
                        {this.props.content}
                    </div>}
                    {this.props.children}
                </div>
            </TooltipContainer>
        );
    }
}

Tooltip.propTypes = {
    content: PropTypes.string.isRequired,
    position: PropTypes.string,
}

Tooltip.defaultProps = {
    position: "bottom",
}
