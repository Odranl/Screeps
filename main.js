/// <reference path="typings/index.d.ts" />

var MAX_UPGRADER_ALIVE = 3;
var MAX_BUILDERS_ALIVE = 2;
var MAX_MINERS_ALIVE = 4;
var MAX_COLLECTORS_ALIVE = 6;
var MAX_REPAIRER_ALIVE = 1;

var runHarvester = require('role.harvester');
var runUpgrader = require('role.upgrader');
var runBuilder = require('role.builder');
var runMiner = require('role.miner');
var runEnergyCollector = require('role.energycollector');
var runRepairer = require('subrole.repairer');

var harvestersCount = 0;
var upgraderCount = 0;
var builderCount = 0;
var minersCount = 0;
var energyCollectorsCount = 0;
var repairerCount = 0;

var repairer = [WORK, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, WORK, CARRY, MOVE, WORK, MOVE, MOVE];
var standardWorker = [WORK, MOVE, MOVE, CARRY, CARRY, WORK, MOVE, MOVE]; 
var miner = [WORK, WORK, WORK, WORK, MOVE, MOVE, WORK, WORK, MOVE, MOVE];
var energyCollector = [MOVE,MOVE,MOVE, MOVE,MOVE,CARRY,CARRY,CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE];

var cost = function(arrayOfTasks) {

    var energyCost = 0;

    for (var number in arrayOfTasks) {
        switch (number) {
            case WORK: 
                energyCost+=100; 
                break;
            case CARRY:
            case MOVE:
                energyCost+=50;

        }
    }

    return energyCost;
}

var creepSpawn = function(arrayOfTasks, role) {
    if (cost(arrayOfTasks) <= Game.spawns['Spawn1'].room.energyCapacityAvailable) {
        Game.spawns['Spawn1'].spawnCreep(arrayOfTasks, role+Game.time, { memory : {role : role}});        
    }
}

var updateCounter = function() {
    upgraderCount = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader').length;
    builderCount = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder').length;
    minersCount = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner').length;
    energyCollectorsCount = _.filter(Game.creeps, (creep) => creep.memory.role == 'energy_collector').length;
    repairerCount =  _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer').length;
}

module.exports.loop = function () {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);

        }
    }

    //#region Spawn creeps based on counters
    if (Game.time % 60 == 0) {
        console.log('Number of upgraders: ' + upgraderCount);
        console.log('Number of builders: ' + builderCount);
        console.log('Number of miners: ' + minersCount);
        console.log('Number of energy collectors: ' + energyCollectorsCount);
        console.log('Number of repairer: ' + repairerCount);        
    }

    updateCounter();

    if (minersCount < MAX_MINERS_ALIVE) {
        creepSpawn(miner, 'miner');        
    } else if (energyCollectorsCount < MAX_COLLECTORS_ALIVE) {
        creepSpawn(energyCollector, 'energy_collector');    
    } else if (repairerCount < MAX_REPAIRER_ALIVE) {
        creepSpawn(repairer, 'repairer');
    } else if (upgraderCount < MAX_UPGRADER_ALIVE) {
        creepSpawn(standardWorker, 'upgrader');        
    } else if (builderCount < MAX_BUILDERS_ALIVE) {
        creepSpawn(standardWorker, 'builder');        
    }
    //#endregion

    for (var name in Game.creeps) {
        
        var creep = Game.creeps[name];

        if (creep.memory.role == 'upgrader') {
            runUpgrader.run(creep);
        } else if (creep.memory.role == 'builder') {
            runBuilder.run(creep);
        } else if (creep.memory.role == 'miner') {
            runMiner.run(creep);
        } else if (creep.memory.role == 'energy_collector') {
            runEnergyCollector.run(creep);
        } else if (creep.memory.role == 'repairer') {
            runRepairer.run(creep);
        }
    }

}
