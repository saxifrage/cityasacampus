Map = {};

// Creates svg element, returned as jQuery object -- http://stackoverflow.com/a/29017767
Map.$svg = function(elem) {
    return $(document.createElementNS('http://www.w3.org/2000/svg', elem));
}

Map.nodeVisit = function(e) {
    Map.popup.call(this);
    Map.pathwayShow.call(this);
    e.stopPropagation();
}

Map.nodeLeave = function(e) {
    Map.popdown.call(this);
    Map.pathwayHide.call(this);
    e.stopPropagation();
}


// Popups

Map.popup = function() {
    var rect = $(this);
    var svg = rect.parent();
    Map.currentPopUp = this;

    /* Position popover */
    var center = Map.centerGet($(this));

    $('.popup').css({
        'top' : center.y,
        'left' : center.x - 300,
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


// Tooltips

Map.tooltip = function(e) {
    var self = this;
    var rect = $(this);
    var svg = rect.parent();

    if (Map.isPoppedUp(this))
        return;

    var center = Map.centerGet($(this));

    $('.tooltip').css({
        'top' : center.y,
        'left' : center.x + 10,
    });

    /* Assign JSON data and show*/
    var resource = Map.resources[svg.attr('id')][rect.attr('id')];

    $('.tooltipResourceName').html(resource.resource_name)
                             .off('click')
                             .on('click', function(e) { Map.nodeVisit.call(self, e); });
    $('.tooltip').show();
    e.stopPropagation();
};

Map.tooltipHide = function() {
    $('.tooltip').hide();
};


// Pathways

Map.pathwayShow = function(e) {
    var rect = $(this)
      , clicked = rect.attr('id')
      , pathway = Map.resource_to_pathway[clicked]
       ;
    $('path.pathway').hide();
    for (var i=0, id; id = pathway.names[i]; i++)
    {
        $('rect[id=' + id + ']').attr('class', 'selected');
        $('path.' + id).show();
    }
};

Map.pathwayHide = function(e) {
    console.log('hiding pathways');
    $('path.pathway').hide();
};


// Init

Map.centerGet = function(rect) {
    var offset = rect.offset();
    var rectWidth = rect[0].getBoundingClientRect().width;
    var rectHeight = rect[0].getBoundingClientRect().height;

    var centerY = offset.top + rectHeight/2;
    var centerX = offset.left + rectWidth/2;

    return {y: centerY, x: centerX};
};

Map.initResources = function(topics) {
    var pathways = {};
    var resource_to_pathway = {};
    var subtopic_to_topic = {};

    function getRectCenter(id) {
        var rect = $('rect[id=' + id + ']');
        var x = parseInt(rect.attr('x'), 10)
          , y = parseInt(rect.attr('y'), 10)
          , w = parseInt(rect.attr('width'), 10)
          , h = parseInt(rect.attr('height'), 10)
           ;
        return {'x': x + w/2, 'y': y + h/2 };
    }

    for (var topic_id in topics) {
        if (!topics.hasOwnProperty(topic_id))
            continue;
        var resources = topics[topic_id];
        var svgDoc = $('svg#'+topic_id);
        for (var id in resources) {
            if (!resources.hasOwnProperty(id))
                continue;
            var resource = resources[id];

            // Populate pathways structures.
            if (!pathways.hasOwnProperty(resource.subtopic_id))
                pathways[resource.subtopic_id] = new DAG();
            pathway = pathways[resource.subtopic_id];
            pathway.addEdges(resource.uid, null, resource.comes_after, resource.comes_before);
            resource_to_pathway[resource.uid] = pathway;
            subtopic_to_topic[resource.subtopic_id] = topic_id;

            // Draw a circle.
            var center = getRectCenter(id);
            var circle = Map.$svg('circle').attr({
                r: 10,
                stroke: 'white',
                'stroke-width': 2,
                fill: 'transparent',
                cy: center.y,
                cx: center.x
            });
            svgDoc.append(circle);
        }
    }


    // Loop back through the completed DAGs and make <path>s.

    for (var subtopic_id in pathways) {
        if (!pathways.hasOwnProperty(subtopic_id)) continue;
        var dag = pathways[subtopic_id];
        var svgDoc = $('svg#'+subtopic_to_topic[subtopic_id]);
        for (var i=0, id; id=dag.names[i]; i++) {
            var v = dag.vertices[id];
            for (var j=0, prev_id; prev_id = v.incomingNames[j]; j++)
            {
                var start = getRectCenter(prev_id);
                var end = getRectCenter(id);

                var path = Map.$svg('path').attr({
                    class: 'pathway ' + id,
                    d: 'M ' + start.x + ' ' + start.y + ' L ' + end.x + ' ' + end.y,
                    stroke: 'white',
                    'stroke-width': 2
                });
                svgDoc.append(path);
            }
        }
    }

    $("body").html($("body").html());
    Map.pathways = pathways;
    Map.resource_to_pathway = resource_to_pathway;
};

Map.init = function() {
    jQuery.get('resources.json', function(resources) {
        $('.navigation').hide();
        Map.resources = resources;
        $('#map').load('map.svg', function() {
            Map.initResources(resources);
            $('rect').hover(Map.tooltip);
            $('svg').mouseout(Map.tooltipHide);
            $('#map').click(Map.tooltipHide);
            $('rect').click(Map.nodeVisit);
            $('body').click(Map.nodeLeave);
        });
    });
};
