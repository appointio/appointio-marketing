// Responsive Navigation
(function() {
    var triggerBttn = document.getElementById('trigger-overlay'),
        overlay = document.querySelector('div.overlay'),
        closeBttn = overlay.querySelector('button.overlay-close');
    transEndEventNames = {
            'WebkitTransition': 'webkitTransitionEnd',
            'MozTransition': 'transitionend',
            'OTransition': 'oTransitionEnd',
            'msTransition': 'MSTransitionEnd',
            'transition': 'transitionend'
        },
        transEndEventName = transEndEventNames[Modernizr.prefixed('transition')],
        support = {
            transitions: Modernizr.csstransitions
        };

    function toggleOverlay() {
        if (classie.has(overlay, 'open')) {
            classie.remove(overlay, 'open');
            classie.add(overlay, 'close');
            var onEndTransitionFn = function(ev) {
                if (support.transitions) {
                    if (ev.propertyName !== 'visibility') return;
                    this.removeEventListener(transEndEventName, onEndTransitionFn);
                }
                classie.remove(overlay, 'close');
            };
            if (support.transitions) {
                overlay.addEventListener(transEndEventName, onEndTransitionFn);
            } else {
                onEndTransitionFn();
            }
        } else if (!classie.has(overlay, 'close')) {
            classie.add(overlay, 'open');
        }
    }

    triggerBttn.addEventListener('click', toggleOverlay);
    closeBttn.addEventListener('click', toggleOverlay);
})();

var app = angular.module('appointio-marketing', ['ngRoute']);
app.config(function($routeProvider) {
    $routeProvider.
        when('/index', {
            templateUrl: 'default'
        }).
        when('/contact', {
            templateUrl: 'contact'
        }).
        when('/price', {
            templateUrl: 'price'
        }).
        when('/tos', {
            templateUrl: 'tos'
        }).
        when('/team', {
            templateUrl: 'team'
        }).
        when('/privacy', {
            templateUrl: 'privacy'
        }).
        otherwise('/index');
});
