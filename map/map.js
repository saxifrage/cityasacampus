// https://gist.github.com/theftprevention/5959411
$.fn.scrollLock=function(){return $(this).on("DOMMouseScroll mousewheel",function(h){var g=$(this),f=this.scrollTop,d=this.scrollHeight,b=g.height(),i=h.originalEvent.wheelDelta,a=i>0,c=function(){h.stopPropagation();h.preventDefault();h.returnValue=false;return false};if(!a&&-i>d-b-f){g.scrollTop(d);return c()}else{if(a&&i>f){g.scrollTop(0);return c()}}})};$.fn.scrollRelease=function(){return $(this).off("DOMMouseScroll mousewheel")};


// Map!

Map = {};

// Creates svg element, returned as jQuery object -- http://stackoverflow.com/a/29017767
Map.$svg = function(elem) {
    return $(document.createElementNS('http://www.w3.org/2000/svg', elem));
}

Map.nodeVisit = function(e) {
    Map.flyout.call(this);
    Map.pathwayShow.call(this);
    e.stopPropagation();
}

Map.nodeLeave = function(e) {
    Map.pathwayHide.call(this);
    Map.flyin.call(this);
    e.stopPropagation();
}


//Flyout Resource
Map.flyout = function(){
    var rect = $(this);
    var svg = rect.parent();
    Map.currentPopUp = this;

    /* Position popover */
    var center = Map.centerGet($(this));

    /* Hide tooltip that pops up on hover */
    $('.tooltip').hide();

    /* Assign JSON data and show */
    var resource = Map.topics[svg.attr('id')]
                      .subtopics[rect.attr('subtopic_id')]
                      .resources[rect.attr('id')];

    $('.selected').attr({'class': '', 'style': ''});
    rect.attr({"style": "animation: fill 2s infinite"});

    $('.resourceName').html(resource.resource_name).attr('href', resource.resource_url);
    $('.flyout-header').css('background-image', 'url("'+resource.image_url+'")');

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
    if ( resource.organizer_description.length > 300) {
        var trimmedOrgDescription = resource.organizer_description.substr(0, 150) + "\u2026";
        $('.orgDescription').html(trimmedOrgDescription);
    } else {
        $('.orgDescription').html(resource.organizer_description);
    }

    $('.activityType').html(resource.location_type);
    $('.activityInterval').html(resource.instance_type);
    $('.activityExperience').html(resource.difficulty);

    /* Concatenates age start and end into single var; replaces 9–90 with 9+ */
    if ( resource.min_age == "9" && resource.max_age == "90" ){
        resource.age_range_all = "9+";
    } else {
        resource.age_range_all = resource.min_age + "&#8212;" + resource.max_age;
    }
    $('.activityAgeAll').html(resource.age_range_all);

    $('.activityAgeStart').html(resource.age_range_all);

    $('.cta a').attr('href', resource.resource_url);

    $('.flyout').addClass('show').scrollLock();
}

Map.currentPopUp = null;
Map.isPoppedUp = function(rect) {
    return (Map.currentPopUp === rect);
};

Map.flyin = function() {
    Map.currentPopUp = null;
    $('.selected').attr({'class': '', 'style': ''});
    $('.flyout').removeClass('show');
};


// Tooltips
Map.tooltip = function(e) {
    var self = this;
    var rect = $(this);
    var svg = rect.parent();
    var height = $('.tooltip').height();
    if (Map.isPoppedUp(this))
        return;

    var center = Map.centerGet($(this));

    $('.tooltip').css({
        'top' : center.y - height - 35,
        'left' : center.x - 125
    });

    /* Assign JSON data and show*/
    var resource = Map.topics[svg.attr('id')]
                      .subtopics[rect.attr('subtopic_id')]
                      .resources[rect.attr('id')];
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
      , topic_id = rect.attr('topic_id')
      , subtopic_id = rect.attr('subtopic_id')
      , pathway = Map.topics[topic_id].subtopics[subtopic_id].dag
      , svg = $('svg#' + topic_id);
       ;
    $('path.pathway').hide();
    for (var i=0, id; id = pathway.names[i]; i++)
    {
        $('rect#' + id, svg).attr('class', 'selected');
        $('path.' + id, svg).show();
    }
};

Map.pathwayHide = function(e) {
    $('path.pathway').hide();
};


// Zooming

Map.initZooming = function() {
    Map._baseTransform = $('g').attr('transform');
    Map._scale = 1;
    Map._scaleFactor = 1.5;
};

Map._zoom = function() {
    $('g').attr('transform', Map._baseTransform + ' scale(' + Map._scale + ')');
};

Map.inZoom = function(e) {
    Map._scale = Map._scale * Map._scaleFactor;
    Map._zoom();
};

Map.outZoom = function(e) {
    Map._scale = Map._scale / Map._scaleFactor;
    Map._zoom();
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

Map.initTopics = function(topics) {

    function getRectCenter(topic_id, resource_id) {
        var rect = $('#' + topic_id + ' rect#' + resource_id);
        var x = parseInt(rect.attr('x'), 10)
          , y = parseInt(rect.attr('y'), 10)
          , w = parseInt(rect.attr('width'), 10)
          , h = parseInt(rect.attr('height'), 10)
           ;
        return {'x': x + w/2, 'y': y + h/2 };
    }

    for (var topic_id in topics) {
        if (!topics.hasOwnProperty(topic_id)) continue;
        var topic = topics[topic_id];

        topic.svg = $('svg#' + topic_id);

        var subtopics = topic.subtopics;
        for (var subtopic_id in subtopics) {
            if (!subtopics.hasOwnProperty(subtopic_id)) continue;
            var subtopic = subtopics[subtopic_id];

            var resources = subtopic.resources;
            for (var resource_id in resources) {
                if (!resources.hasOwnProperty(resource_id)) continue;
                var resource = resources[resource_id];

                // Draw a circle.
                var center = getRectCenter(topic_id, resource_id);
                var circle = Map.$svg('circle').attr({
                    r: 5,
                    stroke: 'white',
                    'stroke-width': 2,
                    fill: 'transparent',
                    cy: center.y,
                    cx: center.x
                });
                topic.svg.append(circle);

                // Teach the rect some things.
                var rect = $('rect#'+resource.id, topic.svg);
                rect.attr({'subtopic_id': subtopic_id, 'topic_id': topic_id});

                // Draw pathways.
                var v = subtopic.dag.vertices[resource_id];
                for (var j=0, prev_id; prev_id = v.incomingNames[j]; j++)
                {
                    var start = getRectCenter(topic_id, prev_id);
                    var end = getRectCenter(topic_id, resource_id);

                    var path = Map.$svg('path').attr({
                        class: 'pathway ' + resource_id,
                        d: 'M ' + start.x + ' ' + start.y + ' L ' + end.x + ' ' + end.y,
                        stroke: 'white',
                        'stroke-width': 2
                    });
                    topic.svg.append(path);
                }
            }
        }
    }
    $("body").html($("body").html());  // refresh to pick up new SVG elements

    Map.topics = topics;
};


Map.init = function() {
    jQuery.get('topics.json', function(topics) {
        $('.navigation').hide();
        $('#map').load('map.svg', function() {
            Map.initZooming();
            Map.initTopics(topics);
            $('rect').hover(Map.tooltip);
            $('svg').mouseout(Map.tooltipHide);
            $('#map').click(Map.tooltipHide);
            $('rect').click(Map.nodeVisit);
            $('.close').click(Map.nodeLeave);
            $('.zoom-controls .in').click(Map.inZoom);
            $('.zoom-controls .out').click(Map.outZoom);
        });
    });
};
