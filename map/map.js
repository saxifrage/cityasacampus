Map = {};

Map.popup = function(e) {
    var rect = $(this);
    var svg = rect.parent();

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
    var resource = Map.resources[svg.attr('id')][rect.attr('id')];

    $('.selected').attr('class', '');
    rect.attr('class', 'selected');

    $('.resourceName').html(resource.resourceName).attr('href', resource.resourceUrl);
    $('.popup-header').css('background-image', 'url("'+resource.imageUrl+'")');

    /* Trims Org Description to 300 chars */
    if ( resource.resourceDescription.length > 300) {
        var trimmedResourceDescription = resource.resourceDescription.substr(0, 300) + "\u2026";
        $('.resourceDescription').html(trimmedResourceDescription);
    } else {
        $('.resourceDescription').html(resource.resourceDescription);
    }

    $('.orgName a').attr('href', resource.orgUrl);
    $('.orgName a').html(resource.orgName);

    /* Trims Org Description to 150 chars */
    if ( resource.orgDescription.length > 300) {
        var trimmedOrgDescription = resource.orgDescription.substr(0, 150) + "\u2026";
        $('.orgDescription').html(trimmedOrgDescription);
    } else {
        $('.orgDescription').html(resource.orgDescription);
    }        

    $('.activityType').html(resource.locationType);
    $('.activityInterval').html(resource.instanceType);
    $('.activityExperience').html(resource.difficultyLevel);

    /* Concatenates age start and end into single var; replaces 9–90 with 9+ */
    if ( resource.ageRangeStart == "9" && resource.ageRangeEnd == "90" ){
        resource.ageRangeAll = "9+";
    } else {
        resource.ageRangeAll = resource.ageRangeStart + "&#8212;" + resource.ageRangeEnd;
    }
    $('.activityAgeAll').html(resource.ageRangeAll);
    
    $('.activityAgeStart').html(resource.ageRangeAll);

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
    var svg = rect.parent();

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
    var resource = Map.resources[svg.attr('id')][rect.attr('id')];

    $('.tooltipResourceName').html(resource.resourceName).attr('href', resource.resourceUrl);
    $('.tooltip').show();
    e.stopPropagation();
};

Map.tooltipHide = function() {
    $('.tooltip').hide();
    $('.selected').attr('class', '');
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
