define(["require", "exports", 'managers/minecraftStatsManager', 'actions/apiAction'], function (require, exports, minecraftStatsManager_1, apiAction_1) {
    "use strict";
    var main = (function () {
        function main() {
        }
        main.start = function () {
            var manager = new minecraftStatsManager_1.Kittens.minecraftStatsManager("static-test-api", "minecraft.baxon.org", 25565);
            var action = apiAction_1.apiAction.newinfo;
            console.log("Loading json", manager.GetCompleteUrl(action));
            manager.GetData(action);
            function logMinecraftInfo(info) {
                console.log("logging minecraft info", info);
            }
            // $(manager).on(["STATS_LOADED"],logMinecraftInfo);
        };
        return main;
    }());
    exports.main = main;
    main.start();
});
//# sourceMappingURL=main.js.map