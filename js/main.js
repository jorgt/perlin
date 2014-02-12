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
    settings.get('experiment');
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

    engine.init(grid);

    window.engine = engine;
   

    //console.log(grid.createGrid());

    
});