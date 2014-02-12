requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'js',
    urlArgs: "bust=" + (new Date()).getTime()
});

require(["engine", "resource", "screen", "grid", "settings"], function(
        engine,
        resource,
        screen,
        grid,
        settings) {


    /*
     how to i want settings...
     
     - array of possible perlin noise manipulations
     - array of possible grid manipulations / thresholds
     - scale, x, y...
     - animation on/off
     - smooth or fit-to-grid
     */
    settings.get('normal');
    //settings.option.perlin.function = 'repeat'

    //settings.option.grid.x = 10;
    //settings.option.grid.y = 10;



    engine.animate = false;
    grid.createGrid();

    engine.resources = resource.tile2;

    engine.screen = new screen({
        canvasElement: 'game',
        optimize: true,
        resources: this.resources
    })

    var game = {
        engine: engine,
        settings: settings,
        grid: grid
    };

    engine.init(grid);

    (function(game) {
        var btn = document.createElement("button");
        var t = document.createTextNode("pause");
        btn.appendChild(t);
        btn.style.position = 'fixed';
        btn.style.top = '30px';
        btn.style.left = '15px';
        btn.onclick = function() {
            game.engine.toggle();
        }
        document.body.appendChild(btn);

        var opt = ['normal', 'normalgrid', 'grid', 'flatgrid', 'experiment'];
        var style = document.createElement("select");
        style.style.position = 'fixed';
        style.style.top = '30px';
        style.style.left = '80px';
        for (var i = 0; i < opt.length; i++) {
            var o = document.createElement('option');
            o.value = opt[i];
            o.innerHTML = opt[i];
            style.appendChild(o);
        }
        style.onchange = function(val) {
            game.settings.get(this.value);
        }
        document.body.appendChild(style);

        var range = document.createElement('input');
        range.type = 'range';
        range.min = 0;
        range.max = 100;
        range.value = 40;
        range.style.position = 'fixed';
        range.style.top = '60px';
        range.style.left = '15px';

        range.onchange = function() {
            game.grid.setLevel(this.value);
        };
        document.body.appendChild(range);
    })(game);

});