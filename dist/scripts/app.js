(function()
{
    "use strict";

angular
    .module("connect4", ["ui.router"])
    .config(function($stateProvider, $locationProvider)
    {
        $locationProvider
            .html5Mode
            ({
                enabled: true,
                requireBase: false
            });

        $stateProvider
            .state
            (
                "game",
                {
                    url         : "/",
                    controller  : "GameCtrl as game",
                    templateUrl : "/templates/game.html"
                }
            )
    });
})();
