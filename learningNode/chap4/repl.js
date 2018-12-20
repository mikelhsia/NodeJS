// redefined the prompt and set the mode to strict, so everything done is under 'use strict'
var repl = require('repl');

connections = 0;

repl.start({
    prompt: 'my repl> ',
    replMode: repl.REPL_MODE_STRICT,
    ignoreUndefined: true,
});
