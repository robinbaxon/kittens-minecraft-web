/// <reference path="./libraries/jquery.d.ts"/>
import {Kittens} from 'managers/minecraftStatsManager'
import {minecraftInfo} from 'models/minecraftInfo'
import {apiAction} from 'actions/apiAction'
export class main {
    public static start() {
        var manager = new Kittens.minecraftStatsManager("static-test-api", "minecraft.baxon.org", 25565);
        var action = apiAction.newinfo;
        console.log("Loading json",manager.GetCompleteUrl(action));
        manager.GetData(action);
        function logMinecraftInfo(info : minecraftInfo ) {
            console.log("logging minecraft info", info)
        }
        // $(manager).on(["STATS_LOADED"],logMinecraftInfo);
    }
}

main.start();


