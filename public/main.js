(function () {

    var LandingPageController = (function() {
        var settings = {
            paletteAPI : 'http://www.colourlovers.com/api/palettes/random?jsonCallback=?',
            authenticate : '/authenticate'
        };

        var dom = {
            backgroundItem : '.js-background-item',
            button         : '.js-contact-page-form-button',
            dotsContainer  : '.js-dots-container',
            form           : '.js-pocket-authentication-form'
        };

        /**
         * Get a random palette from colourlovers
         * and update the dots.
         * @return {[type]} [description]
         */
        function updatePalette() {
            $.getJSON(settings.paletteAPI,
                function(allPalettes) {
                    palettes = allPalettes[0].colors;
                    $( dom.backgroundItem ).each( function( index ) {
                        $( this ).css( 'background', '#'+palettes[ index ] );
                    });
                    setTimeout( function(){
                        updatePalette();
                    }, 1000 );
                }
            );
        }

        function authenticatePocket() {
            $.getJSON( settings.authenticate, function( response ) {
                console.log( response );
            });
        }


        /**
         * DOM events to be handled
         * @return {[type]} [description]
         */
        function events() {
            $( dom.button ).on( 'click', function() {
                $( dom.dotsContainer ).attr( 'data-state','loading' );
                authenticatePocket();
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