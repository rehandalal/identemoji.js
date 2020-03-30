import React from "react";
import PropTypes from "prop-types";

import Identemoji from "@identemoji/core";

export default class IdentemojiComponent extends React.Component {
  static propTypes = {
    onLoad: PropTypes.func,
    seed: PropTypes.string.isRequired,
    size: PropTypes.number,
    theme: PropTypes.shape({
      colors: PropTypes.arrayOf(PropTypes.string).isRequired,
      emojis: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
  };

  static defaultProps = {
    size: 96,
  };

  constructor(props) {
    super(props);
    this.state = {
      identemoji: null,
    };
  }

  drawIdentemoji() {
    const { onLoad, seed, size, theme } = this.props;
    const identemoji = new Identemoji(seed, theme, size);
    identemoji.draw().then(() => {
      this.setState({ identemoji });
      onLoad(identemoji);
    });
  }

  componentDidMount() {
    this.drawIdentemoji();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.seed !== this.props.seed ||
      prevProps.size !== this.props.size ||
      prevProps.theme !== this.props.theme
    ) {
      this.drawIdentemoji();
    }
  }

  render() {
    const { onLoad, seed, size, theme, ...imgProps } = this.props;
    const { identemoji } = this.state;
    if (identemoji) {
      return <img src={identemoji.canvas.toDataURL()} {...imgProps} />;
    }
    return null;
  }
}
