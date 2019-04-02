import svgToTinyDataUri from "mini-svg-data-uri";

import { getDeltaE, getHash } from "./utils";

export default class Identemoji {
  constructor(seed, theme, size = 96) {
    this.size = size;
    this.seed = seed;
    this.theme = {
      layouts: [...Array(10).keys()],
      minColorVariance: 0,
      ...theme
    };

    // Set up the canvas
    this.canvas = document.createElement("canvas");
    this.canvas.setAttribute("width", size);
    this.canvas.setAttribute("height", size);
  }

  async drawBackground(ctx, hash) {
    const { size } = this;
    const { colors, layouts, minColorVariance } = this.theme;
    const layout = layouts[parseInt(hash.substring(0, 2), 16) % layouts.length];

    const color = [];
    for (let i = 0; i < 4; i++) {
      const key =
        parseInt(hash.substring(18 - i * 2, 20 - i * 2), 16) % colors.length;
      color[i] = colors[key];

      if (color[i - 1]) {
        let offset = 1;
        while (
          offset < colors.length &&
          getDeltaE(color[i], color[i - 1]) <= minColorVariance
        ) {
          color[i] = colors[(key + offset) % colors.length];
          offset++;
        }
      }
    }

    switch (layout) {
      case 9:
        ctx.fillStyle = color[0];
        ctx.fillRect(0, 0, size, size);

        ctx.fillStyle = color[1];
        ctx.fillRect(size / 4, 0, (size * 3) / 4, size);

        ctx.fillStyle = color[2];
        ctx.fillRect(size / 2, 0, size / 2, size);

        ctx.fillStyle = color[3];
        ctx.fillRect((size * 3) / 4, 0, size / 4, size);
        break;

      case 8:
        ctx.fillStyle = color[0];
        ctx.fillRect(0, 0, size, size);

        ctx.fillStyle = color[1];
        ctx.fillRect(0, size / 4, size, (size * 3) / 4);

        ctx.fillStyle = color[2];
        ctx.fillRect(0, size / 2, size, size / 2);

        ctx.fillStyle = color[3];
        ctx.fillRect(0, (size * 3) / 4, size, size / 4);
        break;

      case 7:
        ctx.fillStyle = color[0];
        ctx.fillRect(0, 0, size, size);

        ctx.fillStyle = color[1];
        ctx.fillRect(0, size / 3, (size * 2) / 3, (size * 2) / 3);
        ctx.fillRect(size / 3, 0, (size * 2) / 3, (size * 2) / 3);

        ctx.fillStyle = color[2];
        ctx.fillRect(0, (size * 2) / 3, size / 3, size / 3);
        ctx.fillRect(size / 3, size / 3, size / 3, size / 3);
        ctx.fillRect((size * 2) / 3, 0, size / 3, size / 3);
        break;

      case 6:
        ctx.fillStyle = color[0];
        ctx.fillRect(0, 0, size, size);

        ctx.fillStyle = color[1];
        ctx.fillRect(0, 0, (size * 2) / 3, (size * 2) / 3);
        ctx.fillRect(size / 3, size / 3, (size * 2) / 3, (size * 2) / 3);

        ctx.fillStyle = color[2];
        ctx.fillRect(0, 0, size / 3, size / 3);
        ctx.fillRect(size / 3, size / 3, size / 3, size / 3);
        ctx.fillRect((size * 2) / 3, (size * 2) / 3, size / 3, size / 3);
        break;

      case 5:
        ctx.fillStyle = color[0];
        ctx.fillRect(0, 0, size, size);

        ctx.fillStyle = color[1];
        ctx.fillRect(size / 3, 0, (size * 2) / 3, size);

        ctx.fillStyle = color[2];
        ctx.fillRect((size * 2) / 3, 0, size / 3, size);
        break;

      case 4:
        ctx.fillStyle = color[0];
        ctx.fillRect(0, 0, size, size);

        ctx.fillStyle = color[1];
        ctx.fillRect(0, size / 3, size, (size * 2) / 3);

        ctx.fillStyle = color[2];
        ctx.fillRect(0, (size * 2) / 3, size, size / 3);
        break;

      case 3:
        ctx.fillStyle = color[0];
        ctx.fillRect(0, 0, size, size);

        ctx.fillStyle = color[1];
        ctx.fillRect(0, size / 2, size / 2, size / 2);
        ctx.fillRect(size / 2, 0, size / 2, size / 2);
        break;

      case 2:
        ctx.fillStyle = color[0];
        ctx.fillRect(0, 0, size, size);

        ctx.fillStyle = color[1];
        ctx.fillRect(0, size / 2, size, size / 2);
        break;

      case 1:
        ctx.fillStyle = color[0];
        ctx.fillRect(0, 0, size, size);

        ctx.fillStyle = color[1];
        ctx.fillRect(size / 2, 0, size / 2, size);
        break;

      default:
        ctx.fillStyle = color[0];
        ctx.fillRect(0, 0, size, size);
        break;
    }
  }

  drawEmoji(ctx, hash) {
    const { size } = this;
    const { emojis } = this.theme;
    const emoji = emojis[parseInt(hash.substring(2, 5), 16) % emojis.length];

    return new Promise(resolve => {
      const img = new Image();
      img.onload = function() {
        ctx.shadowColor = "rgba(0, 0, 0, 0.25)";
        ctx.shadowBlur = size / 8;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.drawImage(
          img,
          (size * 3) / 16,
          (size * 3) / 16,
          (size * 5) / 8,
          (size * 5) / 8
        );
        resolve();
      };
      img.src = svgToTinyDataUri(emoji);
    });
  }

  async draw() {
    const hash = await getHash(this.seed);
    const ctx = this.canvas.getContext("2d");
    const { colors, emojis } = this.theme;
    if (colors.length) {
      await this.drawBackground(ctx, hash);
    }
    if (emojis.length) {
      await this.drawEmoji(ctx, hash);
    }
  }

  async toDataURL(type, encoderOptions) {
    return this.canvas.toDataURL(type, encoderOptions);
  }
}
