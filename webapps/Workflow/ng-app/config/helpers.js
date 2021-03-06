var path = require('path');
var _root = path.resolve(__dirname, '..');

const EVENT = process.env.npm_lifecycle_event || '';

function hasNpmFlag(flag) {
    return EVENT.includes(flag);
}

function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [_root].concat(args));
}

exports.root = root;
exports.hasNpmFlag = hasNpmFlag;
