/// <reference path="../libraries/jquery.d.ts"/>
/// <reference path="../models/minecraftInfo.ts"/>
import {minecraftInfo} from '../models/minecraftInfo'
import {apiAction} from '../actions/apiAction'
import {players} from '../models/players'
export module Kittens {
    
    /// A simple data manager for fetching stats from a given API.  
    /// Found a usable API at api.fhrnet.eu/mc/ to use as a reference/default api, on which all info models are based upon.  
    export class minecraftStatsManager {
        private ApiUrl : string;
        private MinecraftHost : string;
        private MinecraftPort : number;
        
        private OnlineClass = ".online";
        private OfflineClass = ".offline";
        private PlayersClass = ".players";
        private DetailsPlayersClass = ".details-players";
        
        public MinecraftInfo : minecraftInfo;
        
        
        
        constructor(apiUrl : string = "static-test-api", minecraftHost : string = "minecraft.baxon.org", minecraftPort : number = 25565) {
                this.ApiUrl = apiUrl;
                this.MinecraftHost = minecraftHost;
                this.MinecraftPort = minecraftPort;
        };
        
        private SetData(data : string){
            var info : minecraftInfo = new minecraftInfo();
            this.MinecraftInfo = SerializationHelper.toInstance<minecraftInfo>(info, data);
        }
        
        public GetData(apiAction : apiAction){
            $.getJSON( this.GetCompleteUrl(apiAction), function( data ){
                this.SetData(data);
                if(this.MinecraftInfo !== undefined)
                {
                    var event = new Event('STATS_LOADED');
                    /// @TODO Fork all DOM logic out in separate handlers. 
                    console.log("Server description:",this.MinecraftInfo.description)
                    this.ToggleOnline(true);
                    var players = this.MinecraftInfo.players;
                    if(players.online !== undefined && players.online > 0)
                    {
                        this.ListPlayers(players);
                    }
                    console.log("Player information:",this.MinecraftInfo.players)
                    console.log("Mod information:",this.MinecraftInfo.modinfo)
                }
                
            }.bind(this));
        }
        
        public GetCompleteUrl(action : apiAction): string {
            return  this.ApiUrl+"/"+this.MinecraftHost+"/"+this.MinecraftPort+"/"+apiAction[action]+"?method=json";
        } 
        
        private ToggleOnline(online : boolean) {
            if(online) {
                $(this.OnlineClass).css("display","inline-block");
                $(this.OfflineClass).css("display","none")    
            }
            else {
                $(this.OfflineClass).css("display","inline-block");
                $(this.OnlineClass).css("display","none");    
            }
            
        }
        
        private ListPlayers(players : players) {
            var playersList = $(this.PlayersClass);
            var playersListElements = new Array<HTMLElement>();
            Object.keys(players.sample).map(function(value, index) {
                var thisplayer = players.sample[value];
                var listelement = document.createElement("LI");
                listelement.innerText = thisplayer["name"];
                playersListElements.push(listelement);
                
            });
            playersList.append(playersListElements);
            $(this.DetailsPlayersClass).css("display","block");
        }
        
        
}
    class SerializationHelper {
        static toInstance<T>(obj: T, json: any) : T {
            var jsonObj = json
            for (var propName in jsonObj) {
                obj[propName] = jsonObj[propName]
            }
            return obj;
        }
    }
}