import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { importMetaAssets } from '@web/rollup-plugin-import-meta-assets';
import copy from 'rollup-plugin-copy';

export default {
  input: './scl-wizarding.ts',
  output: {
    sourcemap: true, // Add source map to build output
    format: 'es', // ES module type export
    dir: 'dist', // The build output folder
    // preserveModules: true,  // Keep directory structure and files
  },
  preserveEntrySignatures: 'strict', // leaves export of the plugin entry point

  plugins: [
    /** Resolve bare module imports */
    nodeResolve(),
    typescript(),
    importMetaAssets(),
    copy({
      targets: [
        {
          src: [
            'node_modules/ace-custom-element/dist/ace/ext-searchbox.js',
            'node_modules/ace-custom-element/dist/ace/mode-xml.js',
            'node_modules/ace-custom-element/dist/ace/theme-solarized_dark.js',
            'node_modules/ace-custom-element/dist/ace/theme-solarized_light.js',
            'node_modules/ace-custom-element/dist/ace/worker-xml.js',
          ],
          dest: 'dist/ace',
        },
      ],
    }),
  ],
};
