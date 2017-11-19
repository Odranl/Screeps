/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('subrole.build');
 * mod.thing == 'a thing'; // true
 */
/// <reference path="typings/index.d.ts" />

module.exports = {
    /** @param {Creep} creep */
    run: function(creep) {
        var findConstructionSites = creep.room.find(FIND_CONSTRUCTION_SITES);
        if (findConstructionSites.length && !require('main').stopBuilders) {
            if (creep.build(findConstructionSites[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(findConstructionSites[0], { visualizePathStyle : { stroke : '#ffffff'}});
            }
        }
    }
};