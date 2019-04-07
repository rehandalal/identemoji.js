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
          Seed:
          <InputGroup
            value={this.state.seed}
            onChange={this.handleSeedChange}
            rightElement={
              <Button onClick={this.randomizeSeed} minimal>
                Random
              </Button>
            }
          />
        </Label>

        <Label>Size:</Label>
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
    return null;
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
          highlightActiveLine
        />
      </div>
    );
  }

  renderThemeSettings() {
    return (
      <div className="theme-settings">
        <h3 className={Classes.HEADING}>Theme Settings:</h3>
        <ButtonGroup className="theme-settings-actions">
          <Button
            active={this.state.editMode === "interactive"}
            onClick={this.handleInteractiveModeClick}
          >
            Interactive
          </Button>
          <Button
            active={this.state.editMode === "raw"}
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
      <React.Fragment>
        <h1 className={Classes.HEADING}>Theme Builder</h1>

        <Divider />

        <div className="builder">
          {this.renderIdenticonSettings()}
          {this.renderThemeSettings()}
        </div>
      </React.Fragment>
    );
  }
}

export default ThemeBuilder;
