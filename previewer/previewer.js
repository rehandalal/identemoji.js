import defaultTheme from "../theme";

import Identemoji from "../src";

const defaultSeed = "test";

const seedField = document.getElementById("seed");
const themeField = document.getElementById("theme");

seedField.value = defaultSeed;
themeField.value = JSON.stringify(defaultTheme, null, 2);

const generateButton = document.getElementById("generate");

const handleGenerate = () => {
  const ie = new Identemoji(seedField.value, JSON.parse(themeField.value), 512);
  ie.draw();

  const pb = document.getElementById("preview-box");
  pb.innerHTML = "";
  pb.appendChild(ie.canvas);
};

handleGenerate();
generateButton.addEventListener("click", handleGenerate);
