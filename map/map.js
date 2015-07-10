Map = {};

Map.popup = function(e) {
    var rect = $(this);
    var resource = Map.resources[rect.attr('id')];

    $('.selected').attr('class', '');
    rect.attr('class', 'selected');

    $('.resourceName').html(resource.resourceName).attr('href', resource.resourceUrl);
    $('.popup h1').css('background-image', 'url("'+resource.imageUrl+'")');
    $('.resourceDescription').html(resource.resourceDescription);

    $('.orgName a').attr('href', resource.orgUrl);
    $('.orgName a').html(resource.orgName);
    $('.orgDescription').html(resource.orgDescription);

    $('.cta a').attr('href', resource.resourceUrl);

    $('.popup').show();
    e.stopPropagation();
};

Map.popdown = function() {
    $('.popup').hide();
    $('.selected').attr('class', '');
};

Map.init = function() {

    jQuery.get('resources.json', function(resources) {
        Map.resources = resources;
        $('#map').load('map.svg', function() {
            $('svg').svg();
            var svg = $('svg').svg('get');

            $('rect').click(Map.popup);
            $('#map').click(Map.popdown);
        });
    });
};
