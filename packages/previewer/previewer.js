import Identemoji from "../core";
import { getHash } from "../core/utils";

import defaultTheme from "../theme/default";

const defaultSeed = "test";

const seedField = document.getElementById("seed");
const themeField = document.getElementById("theme");

const handleChange = () => {
  const ie = new Identemoji(seedField.value, JSON.parse(themeField.value), 512);
  ie.draw();

  const pb = document.getElementById("preview-box");
  pb.innerHTML = "";
  pb.appendChild(ie.canvas);
};

seedField.addEventListener("input", handleChange);
themeField.addEventListener("input", handleChange);

seedField.value = defaultSeed;
themeField.value = JSON.stringify(defaultTheme, null, 2);
handleChange();

const randomButton = document.getElementById("random");

randomButton.addEventListener("click", async () => {
  const v = await getHash(Date.now());
  seedField.value = v.slice(0, 8);
  handleChange();
});
