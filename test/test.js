const glob = require('glob');
const path = require('path');
const sassTrue = require('sass-true');

glob.sync(path.join(__dirname, '**', '*.scss'))
  .forEach(file => {
    sassTrue.runSass(
      {
        file,
      },
      describe,
      it
    );
  })
;
