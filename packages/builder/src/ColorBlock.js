import autobind from "autobind-decorator";
import PropTypes from "prop-types";
import React from "react";

import { Icon } from "@blueprintjs/core";
import ColorPicker from "./ColorPicker";

@autobind
class ColorBlock extends React.Component {
  static propTypes = {
    color: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    onDelete: PropTypes.func
  };

  handleDeleteClick() {
    const { index, onDelete } = this.props;
    if (onDelete) {
      onDelete(index);
    }
  }

  handleClick(ev) {
    const parent = ev.target.parentElement;
    const bounds = parent.getBoundingClientRect();

    this.picker.show(
      bounds.left + window.scrollX,
      bounds.bottom + window.scrollY
    );
  }

  handleChange(color) {
    const { index, onChange } = this.props;
    onChange(index, color.hex);
  }

  render() {
    const { color } = this.props;

    return (
      <div className="color-block">
        <span className="delete-button" onClick={this.handleDeleteClick}>
          <Icon color="white" icon="small-cross" />
        </span>
        <div
          className="swatch"
          style={{
            backgroundColor: color
          }}
          onClick={this.handleClick}
        />
        <ColorPicker
          color={color}
          onChange={this.handleChange}
          ref={el => {
            this.picker = el;
          }}
        />
      </div>
    );
  }
}

export default ColorBlock;
