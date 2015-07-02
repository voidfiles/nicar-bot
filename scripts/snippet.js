// Description:
//   Saves random snippets to be replayed
//
// Configuration:
//   NONE
//
// Commands:
//   hubot save <snippet> as <expand>
//   !<expand>
//
//
// Author:
//   voidfiles
'use strict';

module.exports = function (robot) {
  var buildKey = function (val) {
    return 'snippet.' + val;
  };

  robot.respond(/(save)(.*)(as)(.*)/i, function (msg) {
    var save = msg.match[2];
    var as = msg.match[4];
    as = as.trim();
    console.log('yo', buildKey(as), save);
    if (!as || !save) {
      return;
    }

    robot.brain.set(buildKey(as), save);

    msg.reply('Got it!');
    return;
  });

  robot.hear(/^(\!)(.*)$/i, function (msg) {
    var as = msg.match[2];
    if (!as) {
      return;
    }

    var save = robot.brain.get(buildKey(as));

    if (!save) {
      return;
    }

    msg.reply(save);

    return;
  });
};


