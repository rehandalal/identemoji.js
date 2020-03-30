#! /usr/bin/env node

const fs = require("fs");
const path = require("path");
const process = require("process");
const SVGO = require("svgo");

const svgo = new SVGO({
  plugins: [
    { cleanupAttrs: true },
    { inlineStyles: true },
    { removeDoctype: true },
    { removeXMLProcInst: true },
    { removeComments: true },
    { removeMetadata: true },
    { removeTitle: true },
    { removeDesc: true },
    { removeUselessDefs: true },
    { removeXMLNS: false },
    { removeEditorsNSData: true },
    { removeEmptyAttrs: true },
    { removeHiddenElems: true },
    { removeEmptyText: true },
    { removeEmptyContainers: true },
    { removeViewBox: true },
    { cleanupEnableBackground: true },
    { minifyStyles: true },
    { convertStyleToAttrs: true },
    { convertColors: true },
    { convertPathData: true },
    { convertTransform: true },
    { removeUnknownsAndDefaults: true },
    { removeNonInheritableGroupAttrs: true },
    { removeUselessStrokeAndFill: true },
    { removeUnusedNS: true },
    { prefixIds: true },
    { cleanupIDs: true },
    { cleanupNumericValues: false },
    { cleanupListOfValues: true },
    { moveElemsAttrsToGroup: true },
    { moveGroupAttrsToElems: true },
    { collapseGroups: true },
    { removeRasterImages: true },
    { mergePaths: true },
    { convertShapeToPath: true },
    { sortAttrs: true },
    { removeDimensions: false },
    { removeAttrs: true },
    { removeAttributesBySelector: false },
    { removeElementsByAttr: false },
    { addClassesToSVGElement: false },
    { addAttributesToSVGElement: false },
    { removeOffCanvasPaths: false },
    { removeStyleElement: true },
    { removeScriptElement: true },
    { reusePaths: false },
    {
      addDimensions: {
        type: "perItem",
        description: "Adds in the width and height dimensions.",
        fn: function (item) {
          if (item.isElem("svg") && item.hasAttr("viewBox")) {
            const nums = item.attr("viewBox").value.split(/[ ,]+/g);

            const width = parseInt(nums[2], 10) - parseInt(nums[0], 10);
            const height = parseInt(nums[3], 10) - parseInt(nums[1], 10);

            if (item.hasAttr("width")) {
              item.removeAttr("width");
            }

            item.addAttr({
              name: "width",
              value: width + "px",
              prefix: "",
              local: "width",
            });

            if (item.hasAttr("height")) {
              item.removeAttr("height");
            }

            item.addAttr({
              name: "height",
              value: height + "px",
              prefix: "",
              local: "height",
            });
          }
        },
      },
    },
  ],
});

const files = process.argv.slice(2);

function optimize(file) {
  const fp = path.join(process.cwd(), file);

  fs.readFile(fp, "utf8", async function (err, data) {
    if (err) {
      throw err;
    }

    // Do six passes for multipass optimizations
    for (let p = 0; p < 6; p++) {
      await svgo.optimize(data, { path: fp }).then(function (output) {
        fs.writeFile(fp, output.data, function () {});
      });
    }
  });
}

for (let i = 0; i < files.length; i++) {
  optimize(files[i]);
}
