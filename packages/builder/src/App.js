import autobind from "autobind-decorator";
import React from "react";

import {
  Button,
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
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seed: "Identemoji",
      size: 192
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

  render() {
    return (
      <div className="container">
        <nav />
        <main>
          <h1 className={Classes.HEADING}>Theme Builder</h1>

          <Divider />

          <div className="identicon-settings">
            <div className="preview">
              <Identemoji
                seed={this.state.seed}
                size={this.state.size * 2}
                theme={defaultTheme}
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
        </main>
      </div>
    );
  }
}

export default App;
