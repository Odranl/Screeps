/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.energycollector');
 * mod.thing == 'a thing'; // true
 */

/// <reference path="typings/index.d.ts" />

var runSubRoleCollector = require('subrole.collector')

var runSubRoleEnergyTransfer = require('subrole.energytransfer')
module.exports = {
    /** @param {Creep} creep */
    run: function(creep) {

        if (creep.memory.transfering && creep.carry.energy == 0) {
            creep.memory.transfering = false;
        }

        if (!creep.memory.transfering && creep.carry.energy == creep.carryCapacity) {
            creep.memory.transfering = true;
        }

        if (!creep.memory.transfering) {
            runSubRoleCollector.run(creep);
        } else {
            runSubRoleEnergyTransfer.run(creep);
        }
    }
};