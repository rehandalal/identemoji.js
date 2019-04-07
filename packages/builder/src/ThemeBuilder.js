import autobind from "autobind-decorator";
import React from "react";

import AceEditor from "react-ace";
import {
  Button,
  ButtonGroup,
  Classes,
  Divider,
  InputGroup,
  Label,
  Radio,
  RadioGroup
} from "@blueprintjs/core";
import IdentemojiCore from "@identemoji/core";
import { getHash } from "@identemoji/core/utils";
import Identemoji from "@identemoji/react";
import defaultTheme from "@identemoji/default-theme";

@autobind
class ThemeBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: "interactive",
      seed: "Identemoji",
      size: 192,
      theme: defaultTheme
    };
  }

  async handleSeedChange(ev) {
    this.setState({
      seed: ev.target.value
    });
  }

  handleSizeChange(ev) {
    this.setState({
      size: parseInt(ev.target.value, 10)
    });
  }

  async randomizeSeed() {
    const seed = await getHash(Date.now());
    this.setState({ seed: seed.slice(0, 8) });
  }

  async handleIdentemojiLoad(identemoji) {
    let link = document.querySelector('link[rel*="icon"]');
    if (link) {
      link.remove();
    }
    link = document.createElement("link");
    link.type = "image/png";
    link.rel = "shortcut icon";
    link.href = await identemoji.toDataURL();
    document.getElementsByTagName("head")[0].appendChild(link);
  }

  handleInteractiveModeClick() {
    this.setState({ editMode: "interactive" });
  }

  handleRawModeClick() {
    this.setState({ editMode: "raw" });
  }

  handleRawThemeChange(theme) {
    this.setState({ theme: JSON.parse(theme) });
  }

  handleResetThemeClick() {
    this.setState({ theme: defaultTheme });
  }

  renderIdenticonSettings() {
    return (
      <div className="identicon-settings">
        <div className="preview">
          <Identemoji
            seed={this.state.seed}
            size={this.state.size * 2}
            theme={this.state.theme}
            className="identemoji"
            style={{
              width: this.state.size
            }}
            onLoad={this.handleIdentemojiLoad}
          />
        </div>

        <Label>
          <h6 className={Classes.HEADING}>Seed:</h6>
          <InputGroup
            value={this.state.seed}
            onChange={this.handleSeedChange}
            leftIcon="eye-open"
            rightElement={
              <Button onClick={this.randomizeSeed} minimal>
                Random
              </Button>
            }
          />
        </Label>

        <h6 className={Classes.HEADING}>Size:</h6>
        <RadioGroup
          onChange={this.handleSizeChange}
          selectedValue={this.state.size}
          inline
        >
          <Radio label="16 x 16" value={16} />
          <Radio label="24 x 24" value={24} />
          <Radio label="32 x 32" value={32} />
          <Radio label="48 x 48" value={48} />
          <Radio label="64 x 64" value={64} />
          <Radio label="96 x 96" value={96} />
          <Radio label="128 x 128" value={128} />
          <Radio label="192 x 192" value={192} />
        </RadioGroup>
      </div>
    );
  }

  renderInteractiveThemeSettings() {
    return (
      <div className="interactive-editor">
        <h6 className={Classes.HEADING}>Colors:</h6>
        {this.state.theme.colors.map((color, index) => {
          return (
            <div key={index} className="color-block">
              <div
                style={{
                  backgroundColor: color
                }}
              />
            </div>
          );
        })}
      </div>
    );
  }

  renderRawThemeSettings() {
    return (
      <div className="raw-editor">
        <AceEditor
          mode="json"
          theme="crimson_editor"
          fontSize={12}
          height="26rem"
          width="100%"
          value={JSON.stringify(this.state.theme, null, 4)}
          onChange={this.handleRawThemeChange}
          highlightActiveLine
        />
      </div>
    );
  }

  renderThemeSettings() {
    return (
      <div className="theme-settings">
        <h3 className={Classes.HEADING}>Theme Settings</h3>
        <ButtonGroup className="theme-settings-actions">
          <Button
            active={this.state.editMode === "interactive"}
            icon="map"
            onClick={this.handleInteractiveModeClick}
          >
            Interactive
          </Button>
          <Button
            active={this.state.editMode === "raw"}
            icon="code"
            onClick={this.handleRawModeClick}
          >
            Raw
          </Button>
        </ButtonGroup>
        {this.state.editMode === "interactive"
          ? this.renderInteractiveThemeSettings()
          : this.renderRawThemeSettings()}
      </div>
    );
  }

  render() {
    return (
      <div className="page">
        <h1 className={Classes.HEADING}>Theme Builder</h1>
        <div className="main-actions">
          <Button
            icon="refresh"
            intent="primary"
            onClick={this.handleResetThemeClick}
          >
            Reset Theme
          </Button>
        </div>

        <Divider />

        <div className="builder">
          {this.renderIdenticonSettings()}
          {this.renderThemeSettings()}
        </div>
      </div>
    );
  }
}

export default ThemeBuilder;
