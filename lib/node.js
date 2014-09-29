/**
 * @ignore
 * node
 * @author yiminghe@gmail.com
 */

module.exports = require('./node/base');
module.exports.version = '@VERSION@';
require('./node/attach');
require('./node/override');
require('./node/anim');