/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.harvester');
 * mod.thing == 'a thing'; // true
 */

/// <reference path="typings/index.d.ts" />

var runSubHarvest = require('subrole.harvest');
var runSubTransferEnergy = require('subrole.energytransfer');

module.exports = {
    /** @param {Creep} creep*/
    run: function(creep) {
        if (creep.carry.energy < creep.carryCapacity) {
            runSubHarvest.run(creep);
        } else {
            runSubTransferEnergy.run(creep);
        }
    }
};