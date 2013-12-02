// It's a good practice to enumerate the messages we send. This allows us to:
//   1. Keep track of all messages, so we don't have multiple messages doing
//      the same thing
//   2. Avoid string typos. A bad property reference will error. A bad string
//      just won't work silently.

define(function() {

  "use strict";

  return {
    PageBeforeChange: "page:beforeChange",
    PageChange: "page:change",
    PhotoCapture: "photo:capture"
  };

});