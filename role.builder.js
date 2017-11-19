/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.builder');
 * mod.thing == 'a thing'; // true
 */
var subRoleCollect = require('subrole.collector');
var subRoleBuild = require('subrole.build');

var toggles = require('toggles');

var stopBuilders = true;

module.exports = {
    /** @param {Creep} creep */
    run: function(creep) {
        
        if (toggles.enableBuilders == false) {
            creep.moveTo(42, 12);
            return;            
        }
        
        if (creep.memory.building && creep.carry.energy == 0){
            creep.memory.building = false;
        }

        if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
        }

        if (creep.memory.building) {
            subRoleBuild.run(creep);            
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