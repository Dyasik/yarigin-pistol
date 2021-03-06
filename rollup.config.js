import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import babel from 'rollup-plugin-babel';

const production = !process.env.ROLLUP_WATCH;

console.log(
`~~~~~~~~~~
ENV: ${production ? 'PROD' : 'DEV'}
~~~~~~~~~~`
);

export default {
  input: 'src/main.js',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'public/bundle.js'
  },
  plugins: [
    svelte({
      // enable run-time checks when not in production
      dev: !production,
      // we'll extract any component CSS out into
      // a separate file — better for performance
      css: css => {
        css.write('public/bundle.css');
      }
    }),

    production && babel({
      extensions: [ '.js', '.mjs', '.html', '.svelte' ],
      plugins: [
        // ['@babel/plugin-proposal-object-rest-spread', { 'loose': true, 'useBuiltIns': true }],
        // 'babel-plugin-es6-promise',
        // 'es6-promise',
      ],
      presets: [
        ['@babel/preset-env', {
          targets: {
            ie: "10",
          },
          // useBuiltIns: 'usage',
          // corejs: 3,
        }],
      ],
    }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration —
    // consult the documentation for details:
    // https://github.com/rollup/rollup-plugin-commonjs
    resolve({ browser: true }),
    commonjs(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload('public'),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser()
  ],
  watch: {
    clearScreen: true
  }
};
