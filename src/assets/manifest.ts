/**
 * Single source of truth for every static art asset in the app.
 *
 * Components must import images from here rather than hard-coding URLs, so
 * a missing file is a build-time type error instead of a silently broken
 * <img> in production (the original export referenced five /public paths
 * that did not exist in the repository).
 */
import fridgePerson from './fridge-person.jpg';
import cornFractal from './corn-fractal.jpg';
import bluesMetalGuitar from './blues-metal-guitar.jpg';

export { fridgePerson, cornFractal, bluesMetalGuitar };
