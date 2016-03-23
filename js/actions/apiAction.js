define(["require", "exports"], function (require, exports) {
    "use strict";
    (function (apiAction) {
        apiAction[apiAction["newinfo"] = 0] = "newinfo";
        apiAction[apiAction["playerlist"] = 1] = "playerlist";
    })(exports.apiAction || (exports.apiAction = {}));
    var apiAction = exports.apiAction;
});
//# sourceMappingURL=apiAction.js.map