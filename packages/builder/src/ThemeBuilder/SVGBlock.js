import autobind from "autobind-decorator";
import PropTypes from "prop-types";
import React from "react";

import { Icon } from "@blueprintjs/core";

@autobind
class SVGBlock extends React.Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    onDelete: PropTypes.func,
    svg: PropTypes.string.isRequired
  };

  handleDeleteClick() {
    const { index, onDelete } = this.props;
    if (onDelete) {
      onDelete(index);
    }
  }

  render() {
    const { svg } = this.props;

    return (
      <div className="svg-block">
        <span className="delete-button" onClick={this.handleDeleteClick}>
          <Icon icon="small-cross" />
        </span>
        <img src={`data:image/svg+xml;charset=utf-8;base64,${btoa(svg)}`} />
      </div>
    );
  }
}

export default SVGBlock;
