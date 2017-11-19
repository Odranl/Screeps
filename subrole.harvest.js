/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('subrole.harvest');
 * mod.thing == 'a thing'; // true
 */
/// <reference path="typings/index.d.ts" />


module.exports = {

    /** @param {Creep} creep */
    run: function(creep) {
        var resStructures = creep.room.find(FIND_SOURCES, 
            { filter: 
                (source) => {
                    return source.energy > 0;
                }
            });

        var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
        
        if (miners[0].name == creep.name) {
            var structure = resStructures.length > 1 ? resStructures[1] : resStructures[0];
            if (creep.harvest(structure) == ERR_NOT_IN_RANGE) {
                creep.moveTo(structure, { visualizePathStyle : { stroke : '#0000ff'}});
            }
        }
        else if (creep.harvest(resStructures[0]) == ERR_NOT_IN_RANGE) {
            
            if (resStructures.length == 1) {
                creep.moveTo(24, 34);
            } else {
                creep.moveTo(resStructures[0], { visualizePathStyle : { stroke : '#0000ff'}});
            }
        }
    }
};