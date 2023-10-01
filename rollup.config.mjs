import { babel } from '@rollup/plugin-babel';
import commonjs from "@rollup/plugin-commonjs";
import sass from 'rollup-plugin-sass';
import resolve  from '@rollup/plugin-node-resolve';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';


export default {
  input: 'index.js',
  plugins: [
    peerDepsExternal(),
    resolve({
      browser: true
    }),
    commonjs({ include: '/node_modules/' }),
    babel({
      babelrc: true,
      babelHelpers: "runtime",
      exclude: 'node_modules/**', // only transpile our source code
      extensions: [".js"],
    }),
    sass(),
  ],
  output: {
    dir: 'dist',
    format: 'es'
  },
};