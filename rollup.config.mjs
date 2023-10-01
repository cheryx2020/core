import { babel } from '@rollup/plugin-babel';
import sass from 'rollup-plugin-sass';

export default {
  input: 'index.js',
  plugins: [
    babel({
      babelHelpers: "runtime",
      exclude: 'node_modules/**', // only transpile our source code
      extensions: [".js"],
    }),
    sass()
  ],
  output: {
    dir: 'dist',
    format: 'es'
  },
};