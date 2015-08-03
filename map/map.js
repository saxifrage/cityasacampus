Map = {};

Map.popup = function(e) {
    var rect = $(this);

    /* Get position and dimensions */
    var offset = $(this).offset();
    var rectWidth = $(this)[0].getBoundingClientRect().width;
    var rectHeight = $(this)[0].getBoundingClientRect().height;

    /* Position popover */
    var centerX = offset.left + rectWidth/2 - 250;
    var centerY = offset.top + rectHeight/2;

    $('.popup').css({
        'top' : centerY,
        'left' : centerX,
    });

    /* Hide tooltip that pops up on hover */
    $('.tooltip').hide();

    /* Assign JSON data and show */
    var resource = Map.resources[rect.attr('id')];

    $('.selected').attr('class', '');
    rect.attr('class', 'selected');

    $('.resourceName').html(resource.resourceName).attr('href', resource.resourceUrl);
    $('.popup-header').css('background-image', 'url("'+resource.imageUrl+'")');
    $('.resourceDescription').html(resource.resourceDescription);

    $('.orgName a').attr('href', resource.orgUrl);
    $('.orgName a').html(resource.orgName);
    $('.orgDescription').html(resource.orgDescription);

    $('.activityType').html(resource.locationType);
    $('.activityInterval').html(resource.instanceType);
    $('.activityExperience').html(resource.difficultyLevel);
    $('.activityAgeStart').html(resource.ageRangeStart);
    $('.activityAgeEnd').html(resource.ageRangeEnd);

    $('.cta a').attr('href', resource.resourceUrl);

    $('.popup').show();
    e.stopPropagation();
};

Map.popdown = function() {
    $('.popup').hide();
    $('.selected').attr('class', '');
};

Map.tooltip = function(e) {
    var rect = $(this);

    /* Get position and dimensions */
    var offset = $(this).offset();
    var rectWidth = $(this)[0].getBoundingClientRect().width;
    var rectHeight = $(this)[0].getBoundingClientRect().height;

    /* Position Tooltip */
    var centerX = offset.left + rectWidth/2;
    var centerY = offset.top + rectHeight/2;

    $('.tooltip').css({
        'top' : centerY,
        'left' : centerX,
    });

    /* Assign JSON data and show*/
    var resource = Map.resources[rect.attr('id')];

    $('.tooltipResourceName').html(resource.resourceName).attr('href', resource.resourceUrl);
    $('.tooltip').show();
    e.stopPropagation();
};

Map.tooltipHide = function() {
    $('.tooltip').hide();
   // $('.selected').attr('class', '');
};

Map.init = function() {

    jQuery.get('resources.json', function(resources) {
        Map.resources = resources;
        $('#map').load('map.svg', function() {
            $('svg').svg();
            var svg = $('svg').svg('get');
            $('rect').hover(Map.tooltip);
            $('svg').mouseout(Map.tooltipHide);
            $('#map').click(Map.tooltipHide);
            $('rect').click(Map.popup);
            $('body').click(Map.popdown);
        });
    });
};
