import { babel } from '@rollup/plugin-babel';
import commonjs from "@rollup/plugin-commonjs";
import sass from 'rollup-plugin-sass';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';


export default {
  input: 'index.js',
  plugins: [
    peerDepsExternal(),
    nodeResolve({
      browser: true
    }),
    babel({
      babelrc: true,
      babelHelpers: "runtime",
      exclude: 'node_modules/**', // only transpile our source code
      extensions: [".js"],
    }),
    commonjs(),
    sass(),
  ],
  output: {
    dir: 'dist',
    format: 'es'
  },
};