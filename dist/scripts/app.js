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
            // .state
            // (
            //     "landing",
            //     {
            //         url         : "/",
            //         controller  : "LandingCtrl as landing",
            //         templateUrl : "/templates/landing.html"
            //     }
            // )
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
