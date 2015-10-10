software = Topic.create(name: 'Software')
math = Topic.create(name: 'Math')
random_img = "http://lorempixel.com/g/400/400/"
neighborhood = 'Oakland'
cloakroom = Location.create(name: 'The Cloakroom', address: '124 S Highland Ave Pittsburgh, PA 15206')
codeandsupply = Organizer.create(name: 'Code & Supply', description: 'Pittsburgh\'s software community', url: 'http://www.codeandsupply.co', logo_url: 'https://raw.githubusercontent.com/codeandsupply/assets/master/logos/logo-large.png')
saxifrage = Organizer.create(name: 'Saxifrage School', description: 'The Saxifrage School is a higher education laboratory working to lower costs, re-think the campus, and reconcile theory with practice.', url: 'http://www.saxifrageschool.org/', logo_url: 'http://www.saxifrageschool.org/img/saxifrage_logo.png')
Organizer.create(name: 'Assemble', description: 'Maker gallery', url: '', logo_url: '')

film = ResourceSubType.create(name: 'Film', resource_type: ResourceType.create(name: 'Digital'))
workshop = ResourceSubType.create(name: 'Workshop', resource_type: ResourceType.create(name: 'Local'))

starterseries = Opportunity.create(name: '#StarterSeries', description: 'Learn to code', organizer: codeandsupply, resource_sub_type: film)
profdev = Opportunity.create(name: 'Professional Development', description: 'Get yourself a better job', organizer: codeandsupply, resource_sub_type: workshop)

Opportunity.create(name: 'Carpentry courses', organizer: saxifrage, resource_sub_type: workshop)

OpportunityInstance.create(name: 'Software Design Patterns', opportunity: starterseries, starts_at: Time.now+1.hours, ends_at: Time.now + 2.hours, location: cloakroom, topic: software, neighborhood: neighborhood, logo_url: random_img, resource_sub_type: film)
OpportunityInstance.create(name: 'Tools of the Trade', opportunity: starterseries, starts_at: Time.now+1.hours, ends_at: Time.now + 2.hours, location: cloakroom, topic: software, neighborhood: neighborhood, logo_url: random_img, resource_sub_type: workshop)
OpportunityInstance.create(name: 'Software Testing', opportunity: starterseries, starts_at: Time.now+1.hours, ends_at: Time.now + 2.hours, location: cloakroom, topic: software, neighborhood: neighborhood, logo_url: random_img)
OpportunityInstance.create(name: 'Programming Principles', opportunity: starterseries, starts_at: Time.now+1.hours, ends_at: Time.now + 2.hours, location: cloakroom, topic: software, neighborhood: neighborhood, logo_url: random_img)

junky_organizer = Organizer.create(name: 'Spam organizer')
junky_opportunities = []
10.times do |n|
  junky_opportunities << Opportunity.create(name: "Opportunity #{n}", description: "This is a class. It'll teach you about #{n}", organizer: codeandsupply, resource_sub_type: workshop)
end

junky_opportunities.each do |opp|
  opp.opportunity_instances.build(
    name: [*('A'..'Z')].sample(6).join + " Software",
    starts_at: Time.now + 6.months,
    ends_at: Time.now + 6.months,
    location: cloakroom,
    topic: software,
    neighborhood: neighborhood,
    location_name: "fooville",
    price: Random.rand(100),
    min_age: 4,
    max_age: Random.rand(99),
    logo_url: random_img,
    resource_sub_type: film
  ).save!

  opp.opportunity_instances.build(
    name: [*('A'..'Z')].sample(6).join + " Math",
    starts_at: Time.now + 6.months,
    ends_at: Time.now + 6.months,
    location: cloakroom,
    topic: math,
    neighborhood: neighborhood,
    location_name: "bazville",
    price: Random.rand(100),
    min_age: 4,
    max_age: Random.rand(99),
    logo_url: random_img,
    resource_sub_type: workshop
  ).save!
end
