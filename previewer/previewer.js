import defaultTheme from "../theme";

import Identemoji from "../src";

import { getHash } from "../src/utils";

const defaultSeed = "test";

const seedField = document.getElementById("seed");
const themeField = document.getElementById("theme");

seedField.value = defaultSeed;
themeField.value = JSON.stringify(defaultTheme, null, 2);

const generateButton = document.getElementById("generate");
const randomButton = document.getElementById("random");

const handleGenerate = () => {
  const ie = new Identemoji(seedField.value, JSON.parse(themeField.value), 512);
  ie.draw();

  const pb = document.getElementById("preview-box");
  pb.innerHTML = "";
  pb.appendChild(ie.canvas);
};

handleGenerate();
generateButton.addEventListener("click", handleGenerate);

randomButton.addEventListener("click", async () => {
  const v = await getHash(Date.now());
  seedField.value = v.slice(0, 8);
  handleGenerate();
});
