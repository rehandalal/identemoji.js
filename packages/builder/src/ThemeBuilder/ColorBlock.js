import autobind from "autobind-decorator";
import PropTypes from "prop-types";
import React from "react";

import { Icon } from "@blueprintjs/core";
import ColorPicker from "./ColorPicker";

@autobind
class ColorBlock extends React.Component {
  static propTypes = {
    color: PropTypes.string.isRequired,
    onChange: PropTypes.func,
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

  renderCloseButton() {
    return (
      <span className="delete-button" onClick={this.handleDeleteClick}>
        <Icon icon="small-cross" />
      </span>
    );
  }

  render() {
    const { color, draggable } = this.props;

    return (
      <div className="color-block">
        {this.renderCloseButton()}
        <div
          className="swatch"
          style={{
            backgroundColor: color || "transparent"
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
