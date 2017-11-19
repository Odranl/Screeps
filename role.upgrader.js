/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.upgrader');
 * mod.thing == 'a thing'; // true
 */

/// <reference path="typings/index.d.ts" />

var runSubHarvest = require('subrole.harvest')
var runSubCollect = require('subrole.collector');
module.exports = {
    /**
     * @param {Creep} creep
     */
    run: function(creep) {
        if (require('toggles').enableUpgraders == false) {
            creep.moveTo(37, 29);
            return;
        }

        if (creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
        }
        if (!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
        }

        if (creep.memory.upgrading) {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, { visualizePathStyle : { stroke : '#00ffff'}});
            }
        } else {
            var structRes = creep.room.find(FIND_STRUCTURES, { filter : 
                function(structure) { 
                    return (structure.structureType == STRUCTURE_CONTAINER) && _.sum(structure.store) > 0
                } 
            });
            
            if (structRes.length)
            {
                if (creep.withdraw(structRes[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structRes[0], { visualizePathStyle : { stroke : '#ffffff'}})
                }
            } else {
                creep.moveTo(42, 12);                
            }    
        }
    }
};