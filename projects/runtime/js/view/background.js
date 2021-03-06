(function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        if(!app) {
            throw new Error("Invaid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }

        // container which will be returned
        var background;
        var backgroundBox = draw.rect(100,100,'Blue');

        var buildings = [];

        // add objects for display inb ackground
        // called at the start of game and whenever the page is resized
        function render() {

            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y + 100;

            background.removeAllChildren();

            // TODO: 3 - YOUR DRAW CODE GOES HERE

            // this fills the background with a obnoxious yellow
            // you should modify this to suit your game
            /*var backgroundFill = draw.rect(canvasWidth,canvasHeight,'yellow');
            background.addChild(backgroundFill);*/
            
            backgroundBox.x = 250;
            backgroundBox.y = 225;
            //background.addChild(backgroundBox);
            
            var buildingHeight = 300;
            var building;
            for (var i = 0;i < parseInt(Math.random()*50);++i){
                building = draw.bitmap("img/clouds.png");
                building.x = 200*i;
                building.y = 10;
               background.addChild(building);
                buildings.push(building);
            }
        }
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            backgroundBox.x = backgroundBox.x + 1;
            if(backgroundBox.x < -100) {
                backgroundBox.x = canvasWidth;
            }
            for (var i = 0; i < buildings.length; i++) {
                buildings[i].x = buildings[i].x - 1;
            }
        }


        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        app.addResizeable(background);
        app.addUpdateable(background);
        
        render();
        return background;
    };
}(window));