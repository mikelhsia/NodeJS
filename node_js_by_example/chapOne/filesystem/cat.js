#!/usr/bin/env node
/* Because the first line starts with #!, you can execute this program directly in Unix-like systems. You don’t need to pass it into the node program */

// Creating Read and Write Streams
'use strict';

require('fs').createReadStream(process.argv[2]).pipe(process.stdout);
