import { babel } from '@rollup/plugin-babel';
import commonjs from "@rollup/plugin-commonjs";
import resolve from '@rollup/plugin-node-resolve';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss-modules'
import autoprefixer from 'autoprefixer'

export default {
  input: 'index.js',
  plugins: [
    peerDepsExternal(),
    resolve({
      browser: true
    }),
    commonjs({
      include: '/node_modules/'
    }),
    babel({
      babelrc: true,
      babelHelpers: "runtime",
      exclude: 'node_modules/**', // only transpile our source code
      presets: ["@babel/preset-react"],
      extensions: [".js"],
    }),
    postcss({
      extract: true,  // extracts to `${basename(dest)}.css`
      plugins: [autoprefixer()],
      writeDefinitions: true,
      // modules: { ... }
    })
  ],
  output: {
    dir: 'dist',
    format: 'es'
  },
};