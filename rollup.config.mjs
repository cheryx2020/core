import { babel } from "@rollup/plugin-babel";
import terser from "@rollup/plugin-terser";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss-modules";
import autoprefixer from "autoprefixer";
import copy from "rollup-plugin-copy";

export default {
  input: "index.js",
  plugins: [
    peerDepsExternal(),
    resolve({
      browser: true,
    }),
    commonjs({
      include: "node_modules/**",
    }),
    babel({
      babelrc: true,
      babelHelpers: "runtime",
      exclude: "node_modules/**", // only transpile our source code
      presets: ["@babel/preset-react"],
      extensions: [".js"],
    }),
    terser(),
    postcss({
      extract: true, // extracts to `${basename(dest)}.css`
      plugins: [autoprefixer()],
      writeDefinitions: true,
      minimize: true,
      // modules: { ... }
    }),
    copy({
      // Specify the files or folders to copy
      targets: [{ src: "src/components/styles/*.scss", dest: "dist/styles" }],
    }),
  ],
  output: {
    dir: "dist",
    format: "es",
  },
};
