// https://gist.github.com/theftprevention/5959411
$.fn.scrollLock=function(){return $(this).on("DOMMouseScroll mousewheel",function(h){var g=$(this),f=this.scrollTop,d=this.scrollHeight,b=g.height(),i=h.originalEvent.wheelDelta,a=i>0,c=function(){h.stopPropagation();h.preventDefault();h.returnValue=false;return false};if(!a&&-i>d-b-f){g.scrollTop(d);return c()}else{if(a&&i>f){g.scrollTop(0);return c()}}})};$.fn.scrollRelease=function(){return $(this).off("DOMMouseScroll mousewheel")};


// Template?!
// ==========

function Template(id) {
    return $($('script#template-'+id).html());
}


// Map!
// ====

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

Map.centerGet = function(rect) {
    var offset = rect.offset();
    var rectWidth = rect[0].getBoundingClientRect().width;
    var rectHeight = rect[0].getBoundingClientRect().height;

    var centerY = offset.top + rectHeight/2;
    var centerX = offset.left + rectWidth/2;

    return {y: centerY, x: centerX};
};


// Flyout Resource
Map.flyout = function(){
    var g = $(this);
    var rect = $('rect', this);
    var svg = g.parent().parent();
    Map.currentPopUp = this;

    /* Hide tooltip that pops up on hover */
    $('.tooltip').hide();

    /* Assign JSON data and show */
    var resource = Map.topics[svg.attr('id')]
                      .subtopics[rect.attr('subtopic_id')]
                      .resources[rect.attr('id')];

    $('.selected').attr({'class': ''});
    g.attr({"style": "animation: fill 2s infinite"});

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

    // Slide to the left, pushing nav.
    $('nav').hide();
    $('nav ul').hide()
    $('nav.primary').show().animate({right: 960}, 300);
    $('nav.secondary[data-id=' + resource.topic_id + ']').show().animate({right: 680}, 300);
    $('nav.tertiary[data-id=' + resource.subtopic_id + ']').show().animate({right: 400}, 300);
    $('.flyout').animate({right: 0}).scrollLock();
}

Map.currentPopUp = null;
Map.isPoppedUp = function(rect) {
    return (Map.currentPopUp === rect);
};

Map.flyin = function() {
    Map.currentPopUp = null;
    $('.selected').attr({'class': '', 'style': ''});
    $('.flyout').animate({right: -400}, {duration: 300, queue: false});

    $('nav.tertiary').animate({right: 0}, {duration: 300, queue: false});
    $('nav.secondary').animate({right: 280}, {duration: 300, queue: false});
    $('nav.primary').animate({right: 560}, {duration: 300, queue: false});
};


// Tooltips
Map.tooltip = function(e) {
    var g = $(this);
    var rect = $('rect', this);
    var svg = g.parent().parent();
    var width = $('.tooltip').width();
    var height = $('.tooltip').height();

    $('.tooltip').css({
        'top' : e.pageY - (height / 2),
        'left' : e.pageX - width - 25
    });

    /* Assign JSON data and show*/
    var resource = Map.topics[svg.attr('id')]
                      .subtopics[rect.attr('subtopic_id')]
                      .resources[rect.attr('id')];
    $('.tooltipResourceName').html(resource.resource_name)
    $('.tooltip').show();
    e.stopPropagation();
};

Map.tooltipHide = function() {
    $('.tooltip').hide();
};


// Pathways
Map.pathwayShow = function(e) {
    var g = $(this)
      , rect = $('rect', this)
      , svg = g.parent().parent()
      , topic_id = rect.attr('topic_id')
      , subtopic_id = rect.attr('subtopic_id')
      , pathway = Map.topics[topic_id].subtopics[subtopic_id].dag
       ;
    $('path.pathway').hide();
    for (var i=0, id; id = pathway.names[i]; i++)
    {
        $('rect#' + id, svg).parent().attr('class', 'selected');
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

    // Start primary nav.
    var navigation = $('.navigation');
    var primary_nav = Template('nav-primary');
    primary_nav.attr('data-id', 'all-topics');
    $('h2 span', primary_nav).html('All Topics');

    for (var topic_id in topics) {
        if (!topics.hasOwnProperty(topic_id)) continue;
        var topic = topics[topic_id];

        topic.svg = $('svg#' + topic_id);
        topic.svg.resources = Map.$svg('g').attr('class', 'resources');
        topic.svg.append(topic.svg.resources);
        topic.svg.pathways = Map.$svg('g').attr('class', 'pathways');
        topic.svg.append(topic.svg.pathways);

        // Add topic to nav.
        $('ul', primary_nav).append(
            $('<li>').append(
                $('<a href="#">').html(topic.name)
            ).attr('data-id', topic_id)
        );
        var secondary_nav = Template('nav-secondary');
        secondary_nav.attr('data-id', topic_id);
        $('h2 span', secondary_nav).html(topic.name);

        var subtopics = topic.subtopics;
        for (var subtopic_id in subtopics) {
            if (!subtopics.hasOwnProperty(subtopic_id)) continue;
            var subtopic = subtopics[subtopic_id];

            // Add subtopic to nav.
            $('ul', secondary_nav).append(
                $('<li>').append(
                    $('<a href="#">').html(subtopic.name)
                ).attr('data-id', subtopic_id)
            );
            var tertiary_nav = Template('nav-tertiary');
            tertiary_nav.attr('data-id', subtopic_id);
            $('h2 span', tertiary_nav).html(subtopic.name);

            var resources = subtopic.resources;
            for (var resource_id in resources) {
                if (!resources.hasOwnProperty(resource_id)) continue;
                var resource = resources[resource_id];

                // Add resource to nav.
                $('ul', tertiary_nav).append(
                    $('<li>').append(
                        $('<a href="#">').html(resource.resource_name)
                    ).attr('data-id', resource_id)
                );

                // Get rect and load it up.
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
                    topic.svg.pathways.append(path);
                }

                // Start a <g>roup
                var group = Map.$svg('g').attr('class', 'resource');

                // Add the group to the topic.
                group.append(rect.detach());
                group.append(circle);
                topic.svg.resources.append(group);

                // Draw a circle.
                var center = getRectCenter(topic_id, resource_id);
                var circle = Map.$svg('circle').attr({
                    r: 5,
                    stroke: 'white',
                    'stroke-width': 2,
                    fill: 'transparent',
                    cy: center.y,
                    cx: center.x,
                    'data-id': resource_id
                });
                topic.svg.resources.append(group);
            }
            navigation.append(tertiary_nav);
        }
        navigation.append(secondary_nav);
    }
    navigation.append(primary_nav);
    // now reverse the order of the dom elements -  http://stackoverflow.com/a/5347882
    navigation.children().each(function(i,nav){navigation.prepend(nav)});
    navigation.show();

    $("body").html($("body").html());  // refresh to pick up new SVG elements

    $('.navigation h2 a').click(Map.navToMenu);
    $('.navigation li a').click(Map.navToItem);
    $('nav').css('display', 'none');
    $('nav.primary').show();

    Map.topics = topics;
};


// Nav
Map.navToMenu = function(e) {
    e.preventDefault();
    e.stopPropagation();

    var heading = $(e.target).closest('h2');
    var nav = heading.closest('nav');
    var list = $('ul', nav);

    // Slide to the right if necessary.
    if (nav.hasClass('primary')) {
        $('.flyout').animate({right: -400}, 300);
        $('nav.tertiary').fadeOut();
        $('nav.secondary').fadeOut();
        nav.animate({right: 0}, 300);
    } else if (nav.hasClass('secondary')) {
        $('.flyout').animate({right: -400}, 300);
        $('nav.tertiary').fadeOut();
        nav.animate({right: 0}, 300);
        $('nav.primary').animate({right: 280}, 300);
    } else if (nav.hasClass('tertiary')) {
        $('.flyout').animate({right: -400}, 300);
        nav.animate({right: 0}, 300);
        $('nav.secondary').animate({right: 280}, 300);
        $('nav.primary').animate({right: 560}, 300);
    }

    // Slide down the menu for this heading.
    list.slideDown(300);
};

Map.navToItem = function(e) {
    e.preventDefault();
    e.stopPropagation();

    var item = $(e.target).closest('li');
    var list = item.closest('ul');
    var nav = item.closest('nav');

    // Slide to the left if necessary.
    if (nav.hasClass('primary')) {
        nav.animate({right: 280}, 300);
    } else if (nav.hasClass('secondary')) {
        $('nav.primary').animate({right: 560}, 300);
        nav.animate({right: 280}, 300);
    } else if (nav.hasClass('tertiary')) {
        $('nav.secondary').animate({right: 680}, 300);
        $('nav.primary').animate({right: 960}, 300);
        nav.animate({right: 400}, 300);
    }
    list.slideUp(300);

    // Turn the new menu on and move it into position.
    var id = item.data('id');
    var heading = $('nav[data-id=' + id + '] h2');

    if (heading.length === 1) {     // topic/subtopic
        var a = $('a', heading);
        var newNav = heading.closest('nav');
        var pos = item.position();

        $('ul', newNav).hide(); // will be unfurled in navToMenu
        newNav.css({top: pos.top})
              .show()
              .animate({top: 0});
        a.click();
    } else {                        // resource
        var rect = $('rect#' + id)
        var center = Map.centerGet(rect);
        var toTop = center.y - ($(window).height() / 2);
        var toLeft = center.x - (($(window).width() - 220) / 2);
        $('body').animate({scrollTop: toTop, scrollLeft: toLeft}, 1000);
        rect.click();
    }
};

Map.init = function() {
    function logScroll() {
        console.log($(this).scrollTop(), $(this).scrollLeft());
    }

    jQuery.get('topics.json', function(topics) {
        $('#map').load('map.svg', function() {
            //$(window).scroll(logScroll);
            Map.initZooming();
            Map.initTopics(topics);
            $('g.resource').mousemove(Map.tooltip)
                           .click(Map.nodeVisit);
            $('svg').mouseout(Map.tooltipHide);
            $('#map').click(Map.tooltipHide);
            $('.close').click(Map.nodeLeave);
            $('.zoom-controls .in').click(Map.inZoom);
            $('.zoom-controls .out').click(Map.outZoom);

            $(window).scrollTop(($('svg').height() - $(window).height()) / 2);
            $(window).scrollLeft(($('svg').width() - $(window).width()) / 2);
        });
    });
};
