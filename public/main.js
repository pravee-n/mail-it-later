(function () {

    var LandingPageController = (function() {
        var settings = {
            paletteAPI : 'http://www.colourlovers.com/api/palettes/top?jsonCallback=?'
        };

        var dom = {
            'backgroundItem' : '.js-background-item'
        };

        function updatePalette() {
            $.getJSON("http://www.colourlovers.com/api/palettes/random?jsonCallback=?",
                function(allPalettes) {
                    palettes = allPalettes;
                    $( dom.backgroundItem ).each( function( index, element ) {
                        $( this ).css( 'background', allPalettes[ index ] );
                    });
                    setTimeout( function(){
                        updatePalette();
                    }, 3000 );
                }
            );
        }

        (function init() {
            updatePalette();
        })()
    })();




})();