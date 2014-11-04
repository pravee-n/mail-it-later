(function () {

    var LandingPageController = (function() {
        var settings = {
            paletteAPI : 'http://www.colourlovers.com/api/palettes/random?jsonCallback=?'
        };

        var dom = {
            backgroundItem : '.js-background-item',
            button         : '.js-contact-page-form-button',
            dotsContainer  : '.js-dots-container'
        };

        function updatePalette() {
            $.getJSON(settings.paletteAPI,
                function(allPalettes) {
                    palettes = allPalettes[0].colors;
                    console.log( palettes );
                    $( dom.backgroundItem ).each( function( index ) {
                        $( this ).css( 'background', '#'+palettes[ index ] );
                    });
                    setTimeout( function(){
                        updatePalette();
                    }, 1000 );
                }
            );
        }

        function events() {
            $( dom.button ).on( 'click', function() {
                $( dom.dotsContainer ).attr( 'data-state','loading' );
            });
        };


        (function init() {
            updatePalette();
            $( document ).ready( function() {
                events();
            });
        })()
    })();
})();