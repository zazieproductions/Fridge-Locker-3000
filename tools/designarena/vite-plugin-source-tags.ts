/**
 * Vite plugin that adds `data-source-loc="file:line:col"` attributes to every
 * JSX element at compile time. This lets the archived DesignArena element
 * picker (see ./element-picker/README.md) map rendered DOM nodes back to their
 * source location.
 *
 * Opt-in dev tooling — enable with `SOURCE_TAGS=1 npm run dev`.
 * It is intentionally excluded from normal builds so production output stays
 * free of source-map metadata.
 *
 * Unlike the original export (which silently relied on @babel/* arriving as
 * transitive dependencies of @vitejs/plugin-react), the Babel packages used
 * here are declared devDependencies of this repository.
 */

import { parse } from '@babel/parser';
import traverseDefault from '@babel/traverse';
import generateDefault from '@babel/generator';
import * as t from '@babel/types';
import type { Plugin } from 'vite';

/**
 * The Babel packages are CommonJS with `exports.default` (plus an `__esModule`
 * marker). Node's CJS→ESM interop exposes the whole `module.exports` object as
 * the default import, while bundlers expose the function directly — unwrap
 * whichever shape we get. (This is the typed version of the interop dance the
 * original export performed with `@ts-ignore`.)
 */
function unwrapCjsDefault<T>(mod: T): T {
  return typeof mod === 'function' ? mod : (mod as { default: T }).default;
}

const traverse = unwrapCjsDefault(traverseDefault);
const generate = unwrapCjsDefault(generateDefault);

/** Vite transform hook context id → only process local JSX/TSX modules. */
function isJsxModule(id: string): boolean {
  return /\.(jsx|tsx)$/.test(id) && !id.includes('node_modules');
}

export function sourceTags(): Plugin {
  let projectRoot = '';

  return {
    name: 'fridge-locker-3000:source-tags',
    enforce: 'pre',

    configResolved(config) {
      projectRoot = config.root;
    },

    transform(code, id) {
      if (!isJsxModule(id)) return null;

      let ast: t.File;
      try {
        ast = parse(code, {
          sourceType: 'module',
          plugins: ['jsx', 'typescript'],
        });
      } catch {
        // Unparseable modules are somebody else's problem — let the real
        // toolchain report the syntax error.
        return null;
      }

      let modified = false;

      traverse(ast, {
        JSXOpeningElement(path) {
          const node = path.node;

          // Skip fragments (<> / <React.Fragment>) — no element to tag.
          if (t.isJSXIdentifier(node.name) && node.name.name === 'Fragment') {
            return;
          }
          if (
            t.isJSXMemberExpression(node.name) &&
            t.isJSXIdentifier(node.name.property) &&
            node.name.property.name === 'Fragment'
          ) {
            return;
          }

          const loc = node.loc;
          if (!loc) return;

          // Already tagged? Avoid double-transform during HMR re-exports.
          const alreadyTagged = node.attributes.some(
            (attr) =>
              t.isJSXAttribute(attr) &&
              t.isJSXIdentifier(attr.name) &&
              attr.name.name === 'data-source-loc',
          );
          if (alreadyTagged) return;

          const relPath = id.startsWith(projectRoot) ? id.slice(projectRoot.length + 1) : id;

          node.attributes.push(
            t.jsxAttribute(
              t.jsxIdentifier('data-source-loc'),
              t.stringLiteral(`${relPath}:${loc.start.line}:${loc.start.column}`),
            ),
          );

          modified = true;
        },
      });

      if (!modified) return null;

      const output = generate(ast, { retainLines: true }, code);
      return { code: output.code, map: output.map };
    },
  };
}
