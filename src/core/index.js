import svgToTinyDataUri from "mini-svg-data-uri";

import { getHash } from "./utils";

export default class Identemoji {
  constructor(seed, theme, size = 96) {
    this.size = size;
    this.seed = seed;
    this.theme = theme;

    // Set up the canvas
    this.canvas = document.createElement("canvas");
    this.canvas.setAttribute("width", size);
    this.canvas.setAttribute("height", size);
  }

  async drawBackground(ctx, hash) {
    const { size } = this;
    const { colors } = this.theme;
    const layout = parseInt(hash.substring(0, 2), 16) % 4;
    const color1 = colors[parseInt(hash.substring(18, 20), 16) % colors.length];
    const color2 = colors[parseInt(hash.substring(16, 18), 16) % colors.length];

    switch (layout) {
      case 3:
        ctx.fillStyle = color1;
        ctx.fillRect(0, 0, size / 2, size / 2);
        ctx.fillRect(size / 2, size / 2, size / 2, size / 2);

        ctx.fillStyle = color2;
        ctx.fillRect(0, size / 2, size / 2, size / 2);
        ctx.fillRect(size / 2, 0, size / 2, size / 2);
        break;

      case 2:
        ctx.fillStyle = color1;
        ctx.fillRect(0, 0, s, size / 2);

        ctx.fillStyle = color2;
        ctx.fillRect(0, size / 2, s, size / 2);
        break;

      case 1:
        ctx.fillStyle = color1;
        ctx.fillRect(0, 0, size / 2, size);

        ctx.fillStyle = color2;
        ctx.fillRect(size / 2, 0, size / 2, size);
        break;

      case 0:
        ctx.fillStyle = color1;
        ctx.fillRect(0, 0, s, size);
        break;
    }
  }

  drawEmoji(ctx, hash) {
    const { size } = this;
    const { emojis } = this.theme;
    const emoji = emojis[parseInt(hash.substring(2, 5), 16) % emojis.length];

    return new Promise(resolve => {
      const img = new Image();
      img.onload = () => {
        ctx.shadowColor = "rgba(0, 0, 0, 0.25)";
        ctx.shadowBlur = s / 8;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.drawImage(
          img,
          (size * 3) / 16,
          (size * 3) / 16,
          (size * 5) / 8,
          (size * 5) / 8
        );
      };
      img.src = svgToTinyDataUri(emoji);
    });
  }

  async draw() {
    const hash = await getHash(this.seed);
    const ctx = this.canvas.getContext("2d");
    await this.drawBackground(ctx, hash);
    await this.drawEmoji(ctx, hash);
  }
}
