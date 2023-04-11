import React, { Component } from "react";
import "./AdaptiveRippleDiv.css";

class AdaptiveRippleDiv extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rippleStyle: {}
    };
  }

  createRipple = (e) => {
    const { offsetX, offsetY, target } = e;
    const { offsetWidth, offsetHeight } = target;
    const diameter = Math.max(offsetWidth, offsetHeight);
    const rippleStyle = {
      width: `${diameter}px`,
      height: `${diameter}px`,
      top: `${offsetY - diameter / 2}px`,
      left: `${offsetX - diameter / 2}px`
    };
    this.setState({ rippleStyle });
  };

  render() {
    const { children, className, ...otherProps } = this.props;
    const { rippleStyle } = this.state;

    return (
      <div
        className={`adaptive-ripple-div ${className}`}
        onClick={this.createRipple}
        {...otherProps}
      >
        {children}
        <span className="ripple" style={rippleStyle} />
      </div>
    );
  }
}

export default AdaptiveRippleDiv;
