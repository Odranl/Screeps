/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('subrole.energytransfer');
 * mod.thing == 'a thing'; // true
 */

/// <reference path="typings/index.d.ts" />

module.exports = {
    
    /** @param {Creep} creep */
    run: function(creep) {
        var structRes = creep.room.find(FIND_MY_STRUCTURES, { filter : 
            function(structure) { 
                return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity
            } 
        });

        if (structRes.length) {
            if (creep.transfer(structRes[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(structRes[0], { visualizePathStyle : { stroke : '#ffffff'}})
            }
        } else {
            var containers = creep.room.find(FIND_STRUCTURES, { filter : 
            (structure) => (structure.structureType == STRUCTURE_CONTAINER)
            });
            
            if (creep.transfer(containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(containers[0], { visualizePathStyle : { stroke : '#ffffff'}})
            }

        }
    }
};