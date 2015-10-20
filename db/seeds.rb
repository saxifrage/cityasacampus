lorem_ipsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
               et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
               aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
               dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
               deserunt mollit anim id est laborum.'

# ------ #
# TOPICS #
# ------ #
software = Topic.create(name: 'Software')
agriculture = Topic.create(name: 'Agriculture')
making = Topic.create(name: 'Making')
art = Topic.create(name: 'Art')

# --------- #
# RESOURCES #
# --------- #
event = ResourceSubType.create(name: 'Event', resource_type: ResourceType.create(name: 'Local'))

# --------- #
# LOCATIONS #
# --------- #
cloakroom_location = Location.create(
    name: 'The Cloakroom', 
    address: '124 S Highland Ave Pittsburgh, PA 15206'
)
sprout_fund_location = Location.create(
    name: 'The Sprout Fund',
    address: '5423 Penn Ave, Pittsburgh, PA 15206'
)
carnegie_library_location = Location.create(
    name: 'Carnegie Library',
    address: '4400 Forbes Ave, Pittsburgh, PA 15213'
)
garfield_community_farm_location = Location.create(
    name: 'Garfield Community Farm',
    address: 'Wicklow St, Pittsburgh, PA 15224'
)
assemble_location = Location.create(
    name: 'Assemble',
    address: '5125 Penn Ave, Pittsburgh, PA 15224'
)
st_pauls_episcopal_church_location = Location.create(
    name: 'St. Paul\'s Episcopal Church',
    address: '1066 Washington Rd. Pittsburgh,PA 15228'
)

# ------------- #
# NEIGHBORHOODS #
# ------------- #
east_liberty = 'East Liberty'
garfield = 'Garfield'
mt_lebanon = 'Mt. Lebanon'

# ---------- #
# ORGANIZERS #
# ---------- #
code_and_supply = Organizer.create(
    name: 'Code & Supply',
    description: 'Pittsburgh\'s software community',
    url: 'http://www.codeandsupply.co',
    logo_url: 'https://raw.githubusercontent.com/codeandsupply/assets/master/logos/logo-large.png'
)
saxifrage_school = Organizer.create(
    name: 'Saxifrage School',
    description: 'The Saxifrage School is a higher education laboratory working to lower costs, re-think the campus, and reconcile theory with practice.',
    url: 'http://www.saxifrageschool.org/',
    logo_url: 'http://www.saxifrageschool.org/img/saxifrage_logo.png'
)
assemble = Organizer.create(
    name: 'Assemble',
    description: 'Maker gallery',
    url: 'http://assemblepgh.org/',
    logo_url: 'http://assemblepgh.org/wp-content/uploads/assemble2.png'
)
garfield_community_farm = Organizer.create(
    name: 'Garfield Community Farm',
    description: 'An Urban Farm in Pittsburgh, PA',
    url: 'http://www.garfieldfarm.com/',
    logo_url: 'https://pbs.twimg.com/profile_images/460535414818738176/_Y21j7Vx.jpeg'
)
carnegie_library = Organizer.create(
    name: 'Carnegie Library of Pittsburgh',
    description: 'Carnegie Library of Pittsburgh',
    url: 'http://www.clpgh.org/',
    logo_url: 'http://www.clpgh.org/images/logos/header-clplogo.jpg'
)
st_pauls_episcopal_church = Organizer.create(
    name: 'St. Paul\'s Episcopal Church',
    description: 'St. Paul\'s Episcopal Church in Mt. Lebanon, PA aims to be the most welcoming congregation for all generations.',
    url: 'http://www.stpaulspgh.org/',
    logo_url: 'http://www.pittsburghhornclub.com/images/StPaulMay2007.jpg'
)

# ------------- #
# OPPORTUNITIES #
# ------------- #
starter_series = Opportunity.create(
    name: 'Starter Series',
    description: 'Learn to code',
    organizer: code_and_supply,
    resource_sub_type: event,
)

gardening_series = Opportunity.create(
    name: 'Gardening',
    description: 'Sow seeds of love! And water, and weed, and harvest',
    organizer: st_pauls_episcopal_church,
    resource_sub_type: event
)

farming = Opportunity.create(
    name: 'Farming',
    description: 'Farming Learning Activities',
    organizer: garfield_community_farm,
    resource_sub_type: event
)

# --------------------- #
# OPPORTUNITY INSTANCES #
# --------------------- #
OpportunityInstance.create(
    name: 'Software Design Patterns',
    opportunity: starter_series,
    location: cloakroom_location,
    topic: software,
    starts_at: Time.now + 3.months,
    ends_at: Time.now + 3.months + 1.days,
    neighborhood: east_liberty,
    logo_url: 'https://developer.apple.com/library/mac/referencelibrary/GettingStarted/RoadMapOSX/Art/design_patterns_2x.png',
    description: lorem_ipsum,
    min_age: 13,
    max_age: 100,
    is_online: false,
    ongoing: false,
    price: 2343,
    registration_deadline: Time.now + 2.months,
    registration_url: 'www.google.com' 
)

#SOFTWARE
OpportunityInstance.create(
    name: 'Tools of the Trade',
    opportunity: starter_series,
    location: sprout_fund_location,
    topic: software,
    starts_at: Time.now + 1.months,
    ends_at: Time.now + 1.months + 1.days,
    neighborhood: garfield,
    logo_url: 'http://www.pcdoctorwi.com/wpimages/wpb8e29707_06.png',
    description: lorem_ipsum,
    min_age: 13,
    max_age: 100,
    is_online: false,
    ongoing: false,
    price: 234,
    registration_deadline: Time.now + 1.week,
    registration_url: 'www.google.com' 
)

OpportunityInstance.create(
    name: 'Software Testing',
    opportunity: starter_series,
    location: cloakroom_location,
    topic: software,
    starts_at: Time.now + 2.months,
    ends_at: Time.now + 2.months + 1.days,
    neighborhood: east_liberty,
    logo_url: 'http://www.feathersoft.com/assets/images/level4/software_testing.png',
    description: lorem_ipsum,
    min_age: 13,
    max_age: 100,
    is_online: false,
    ongoing: false,
    price: 234,
    registration_deadline: Time.now + 2.months,
    registration_url: 'www.google.com' 
)

#AGRICULTURE
OpportunityInstance.create(
    name: 'Gardening 101',
    opportunity: gardening_series,
    location: st_pauls_episcopal_church_location ,
    topic: agriculture,
    starts_at: Time.now + 2.months,
    ends_at: Time.now + 2.months + 1.days,
    neighborhood: mt_lebanon,
    logo_url: 'https://www.filepicker.io/api/file/UH8pXvRRvu88fsczEgsV',
    description: lorem_ipsum,
    min_age: 1,
    max_age: 12,
    is_online: false,
    ongoing: false,
    price: 0,
    registration_deadline: Time.now + 2.months,
    registration_url: 'www.google.com' 
)

OpportunityInstance.create(
    name: 'History of Farming',
    opportunity: farming,
    location: carnegie_library_location,
    topic: agriculture,
    starts_at: Time.now + 3.months,
    ends_at: Time.now + 3.months + 1.days,
    neighborhood: mt_lebanon,
    logo_url: 'http://www.customtimeandattendance.com/news/wp-content/uploads/2014/05/farm.jpg',
    description: lorem_ipsum,
    min_age: 1,
    max_age: 12,
    is_online: false,
    ongoing: false,
    price: 0,
    registration_deadline: Time.now + 2.months,
    registration_url: 'www.google.com' 
)

OpportunityInstance.create(
    name: 'Discover Cattle',
    opportunity: farming,
    location: garfield_community_farm_location ,
    topic: agriculture,
    starts_at: Time.now + 4.months + 5.days,
    ends_at: Time.now + 4.months + 6.days,
    neighborhood: garfield,
    logo_url: 'http://i1.tribune.com.pk/wp-content/uploads/2015/04/874602-thecompassionateroad-1429778494.jpg',
    description: lorem_ipsum,
    min_age: 1,
    max_age: 12,
    is_online: false,
    ongoing: false,
    price: 0,
    registration_deadline: Time.now + 2.months,
    registration_url: 'www.google.com' 
)

#MAKING

###todo...


#ART

###todo...