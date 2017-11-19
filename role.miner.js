/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.miner');
 * mod.thing == 'a thing'; // true
 */

/// <reference path="typings/index.d.ts" />

var runRoleHarvest = require('subrole.harvest');
module.exports = {
    run: function(creep) {
        runRoleHarvest.run(creep);
    }
};