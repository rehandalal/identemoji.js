import autobind from "autobind-decorator";
import PropTypes from "prop-types";
import React from "react";
import ReactDOM from "react-dom";

import { ChromePicker } from "react-color";

@autobind
class ColorPicker extends React.Component {
  static propTypes = {
    color: PropTypes.string,
    onChange: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      x: 0,
      y: 0
    };
  }

  show(x, y) {
    this.setState({
      visible: true,
      x,
      y
    });
  }

  hide() {
    this.setState({
      visible: false
    });
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClick, false);
  }

  handleClick(ev) {
    if (this.node) {
      if (this.node.contains(ev.target)) {
        return;
      }
      this.hide();
    }
  }

  render() {
    const { color, onChange } = this.props;
    const { visible, x, y } = this.state;

    if (!visible) {
      return null;
    }

    return ReactDOM.createPortal(
      <div
        className="color-picker"
        style={{
          left: x,
          top: y
        }}
        ref={node => {
          this.node = node;
        }}
        onClick={this.handleClick}
      >
        <ChromePicker color={color} onChangeComplete={onChange} disableAlpha />
      </div>,
      document.body
    );
  }
}

export default ColorPicker;
