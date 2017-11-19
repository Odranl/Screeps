/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('subrole.repairer');
 * mod.thing == 'a thing'; // true
 */

/// <reference path="typings/index.d.ts" />

module.exports = {
    

    /**
     * @param {Creep} creep
     */
    run: function(creep) {
        var damagedStructures = creep.room.find(FIND_STRUCTURES, 
            { 
                /** @param {Structure} structure */
                filter : (structure) => structure.hits < structure.hitsMax && structure.structureType != STRUCTURE_WALL
            });
        
        if (creep.memory.repairing && creep.carry.energy == 0) {
            creep.memory.repairing = false;
        }

        if (!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
            creep.memory.repairing = true;
        }
        
        if (creep.memory.repairing) {
            if (creep.repair(damagedStructures[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(damagedStructures[0]);
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
}