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

  async draw() {
    const hash = await getHash(this.seed);
    const ctx = this.canvas.getContext("2d");
    const { colors } = this.theme;
    const s = this.size;

    const layout = parseInt(hash.substring(0, 2), 16) % 4;
    const color1 = colors[parseInt(hash.substring(2, 4), 16) % colors.length];
    const color2 = colors[parseInt(hash.substring(4, 6), 16) % colors.length];

    switch (layout) {
      case 3:
        ctx.fillStyle = color1;
        ctx.fillRect(0, 0, s / 2, s / 2);
        ctx.fillRect(s / 2, s / 2, s / 2, s / 2);

        ctx.fillStyle = color2;
        ctx.fillRect(0, s / 2, s / 2, s / 2);
        ctx.fillRect(s / 2, 0, s / 2, s / 2);
        break;

      case 2:
        ctx.fillStyle = color1;
        ctx.fillRect(0, 0, s, s / 2);

        ctx.fillStyle = color2;
        ctx.fillRect(0, s / 2, s, s / 2);
        break;

      case 1:
        ctx.fillStyle = color1;
        ctx.fillRect(0, 0, s / 2, s);

        ctx.fillStyle = color2;
        ctx.fillRect(s / 2, 0, s / 2, s);
        break;

      case 0:
        ctx.fillStyle = color1;
        ctx.fillRect(0, 0, s, s);
        break;
    }
  }
}
