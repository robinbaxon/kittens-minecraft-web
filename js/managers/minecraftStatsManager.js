define(["require", "exports", '../models/minecraftInfo', '../actions/apiAction'], function (require, exports, minecraftInfo_1, apiAction_1) {
    "use strict";
    var Kittens;
    (function (Kittens) {
        /// A simple data manager for fetching stats from a given API.  
        /// Found a usable API at api.fhrnet.eu/mc/ to use as a reference/default api, on which all info models are based upon.  
        var minecraftStatsManager = (function () {
            function minecraftStatsManager(apiUrl, minecraftHost, minecraftPort) {
                if (apiUrl === void 0) { apiUrl = "static-test-api"; }
                if (minecraftHost === void 0) { minecraftHost = "minecraft.baxon.org"; }
                if (minecraftPort === void 0) { minecraftPort = 25565; }
                this.OnlineClass = ".online";
                this.OfflineClass = ".offline";
                this.PlayersClass = ".players";
                this.DetailsPlayersClass = ".details-players";
                this.ApiUrl = apiUrl;
                this.MinecraftHost = minecraftHost;
                this.MinecraftPort = minecraftPort;
            }
            ;
            minecraftStatsManager.prototype.SetData = function (data) {
                var info = new minecraftInfo_1.minecraftInfo();
                this.MinecraftInfo = SerializationHelper.toInstance(info, data);
            };
            minecraftStatsManager.prototype.GetData = function (apiAction) {
                $.getJSON(this.GetCompleteUrl(apiAction), function (data) {
                    this.SetData(data);
                    if (this.MinecraftInfo !== undefined) {
                        var event = new Event('STATS_LOADED');
                        /// @TODO Fork all DOM logic out in separate handlers. 
                        console.log("Server description:", this.MinecraftInfo.description);
                        this.ToggleOnline(true);
                        var players = this.MinecraftInfo.players;
                        if (players.online !== undefined && players.online > 0) {
                            this.ListPlayers(players);
                        }
                        console.log("Player information:", this.MinecraftInfo.players);
                        console.log("Mod information:", this.MinecraftInfo.modinfo);
                    }
                }.bind(this));
            };
            minecraftStatsManager.prototype.GetCompleteUrl = function (action) {
                return this.ApiUrl + "/" + this.MinecraftHost + "/" + this.MinecraftPort + "/" + apiAction_1.apiAction[action] + "?method=json";
            };
            minecraftStatsManager.prototype.ToggleOnline = function (online) {
                if (online) {
                    $(this.OnlineClass).css("display", "inline-block");
                    $(this.OfflineClass).css("display", "none");
                }
                else {
                    $(this.OfflineClass).css("display", "inline-block");
                    $(this.OnlineClass).css("display", "none");
                }
            };
            minecraftStatsManager.prototype.ListPlayers = function (players) {
                var playersList = $(this.PlayersClass);
                var playersListElements = new Array();
                Object.keys(players.sample).map(function (value, index) {
                    var thisplayer = players.sample[value];
                    var listelement = document.createElement("LI");
                    listelement.innerText = thisplayer["name"];
                    playersListElements.push(listelement);
                });
                playersList.append(playersListElements);
                $(this.DetailsPlayersClass).css("display", "block");
            };
            return minecraftStatsManager;
        }());
        Kittens.minecraftStatsManager = minecraftStatsManager;
        var SerializationHelper = (function () {
            function SerializationHelper() {
            }
            SerializationHelper.toInstance = function (obj, json) {
                var jsonObj = json;
                for (var propName in jsonObj) {
                    obj[propName] = jsonObj[propName];
                }
                return obj;
            };
            return SerializationHelper;
        }());
    })(Kittens = exports.Kittens || (exports.Kittens = {}));
});
//# sourceMappingURL=minecraftStatsManager.js.map