/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('subrole.collector');
 * mod.thing == 'a thing'; // true
 */

/// <reference path="typings/index.d.ts" />
 
module.exports = {
    /** @param {Creep} creep */
    run: function(creep) {
        var droppedEnergy = creep.room.find(FIND_DROPPED_RESOURCES);
        if (droppedEnergy.length) {
            if (creep.pickup(droppedEnergy[0]) == ERR_NOT_IN_RANGE){
                creep.moveTo(droppedEnergy[0], { visualizePathStyle : { stroke : '#0000ff'}});
            }
        }
    }
};