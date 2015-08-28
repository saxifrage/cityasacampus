Map = {};

Map.popup = function(e) {
    var rect = $(this);
    var svg = rect.parent();
    Map.currentPopUp = this;

    /* Get position and dimensions */
    var offset = $(this).offset();
    var rectWidth = $(this)[0].getBoundingClientRect().width;
    var rectHeight = $(this)[0].getBoundingClientRect().height;

    /* Position popover */
    var centerX = offset.left + rectWidth/2 - 300;
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

    $('.resourceName').html(resource.resource_name).attr('href', resource.resource_url);
    $('.popup-header').css('background-image', 'url("'+resource.image_url+'")');

    /* Trims Org Description to 300 chars */
    if ( resource.resource_description.length > 300) {
        var trimmedResourceDescription = resource.resource_description.substr(0, 300) + "\u2026";
        $('.resourceDescription').html(trimmedResourceDescription);
    } else {
        $('.resourceDescription').html(resource.resource_description);
    }

    $('.orgName a').attr('href', resource.org_url);
    $('.orgName a').html(resource.org_name);

    /* Trims Org Description to 150 chars */
    if ( resource.org_description.length > 300) {
        var trimmedOrgDescription = resource.org_description.substr(0, 150) + "\u2026";
        $('.orgDescription').html(trimmedOrgDescription);
    } else {
        $('.orgDescription').html(resource.org_description);
    }

    $('.activityType').html(resource.location_type);
    $('.activityInterval').html(resource.instance_type);
    $('.activityExperience').html(resource.difficulty_level);

    /* Concatenates age start and end into single var; replaces 9–90 with 9+ */
    if ( resource.age_range_start == "9" && resource.age_range_end == "90" ){
        resource.age_range_all = "9+";
    } else {
        resource.age_range_all = resource.age_range_start + "&#8212;" + resource.age_range_end;
    }
    $('.activityAgeAll').html(resource.age_range_all);

    $('.activityAgeStart').html(resource.age_range_all);

    $('.cta a').attr('href', resource.resource_url);

    $('.popup').show();
    e.stopPropagation();
};

Map.currentPopUp = null;
Map.isPoppedUp = function(rect) {
    return (Map.currentPopUp === rect);
};

Map.popdown = function() {
    Map.currentPopUp = null;
    $('.popup').hide();
    $('.selected').attr('class', '');
};

Map.tooltip = function(e) {
    var self = this;
    var rect = $(this);
    var svg = rect.parent();

    if (Map.isPoppedUp(this))
        return;

    /* Get position and dimensions */
    var offset = $(this).offset();
    var rectWidth = $(this)[0].getBoundingClientRect().width;
    var rectHeight = $(this)[0].getBoundingClientRect().height;

    /* Position Tooltip */
    var centerX = offset.left + rectWidth/2 + 10;
    var centerY = offset.top + rectHeight/2;

    $('.tooltip').css({
        'top' : centerY,
        'left' : centerX,
    });

    /* Assign JSON data and show*/
    var resource = Map.resources[svg.attr('id')][rect.attr('id')];

    $('.tooltipResourceName').html(resource.resource_name)
                             .off('click')
                             .on('click', function(e) { Map.popup.call(self, e); });
    $('.tooltip').show();
    e.stopPropagation();
};

Map.tooltipHide = function() {
    $('.tooltip').hide();
    $('.selected').attr('class', '');
};

Map.loadPathways = function(topics) {
    var pathways = new DAG();
    for (var topic_uid in topics) {
        if (!topics.hasOwnProperty(topic_uid))
            continue;
        var resources = topics[topic_uid];
        for (var resource_uuid in resources) {
            if (!resources.hasOwnProperty(resource_uuid))
                continue;
            var resource = resources[resource_uuid];
            if (resource.uid === '')  // Pretty sure Tim has cleaned these dud rows up now.
                continue;
            pathways.addEdges(resource.uid, null, resource.comes_after, resource.comes_before);
        }
    }
    Map.pathways = pathways;
};

Map.init = function() {
    jQuery.get('resources.json', function(resources) {
        Map.resources = resources;
        Map.loadPathways(resources);
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
