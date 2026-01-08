import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';
import autoPrefixer from 'autoprefixer';
import cssnano from 'cssnano';
import { terser } from 'rollup-plugin-terser';
import postcssImport from 'postcss-import';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/video-player.js',
      format: 'umd',
      name: 'VideoPlayer',
      sourcemap: true
    },
    {
      file: 'dist/video-player.esm.js',
      format: 'es',
      sourcemap: true
    },
    {
      file: 'dist/video-player.min.js',
      format: 'umd',
      name: 'VideoPlayer',
      plugins: [terser()],
      sourcemap: true
    }
  ],
  plugins: [
    resolve(),
    commonjs(),
    postcss({
      plugins: [
        postcssImport(),
        autoPrefixer(),
        cssnano()
      ],
      extract: 'video-player.css',
      minimize: true
    }),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**'
    })
  ]
};
