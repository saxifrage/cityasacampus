software = Topic.create(name: 'Software')
cloakroom = Location.create(name: 'The Cloakroom')
codeandsupply = Organizer.create(name: 'Code & Supply', description: 'Pittsburgh\'s software community', url: 'http://www.codeandsupply.co', logo_url: 'https://raw.githubusercontent.com/codeandsupply/assets/master/logos/logo-large.png')
saxifrage = Organizer.create(name: 'Saxifrage School', description: 'The Saxifrage School is a higher education laboratory working to lower costs, re-think the campus, and reconcile theory with practice.', url: 'http://www.saxifrageschool.org/', logo_url: 'http://www.saxifrageschool.org/img/saxifrage_logo.png')
Organizer.create(name: 'Assemble', description: 'Maker gallery', url: '', logo_url: '')

starterseries = Opportunity.create(name: '#StarterSeries', description: 'Learn to code', organizer: codeandsupply)
profdev = Opportunity.create(name: 'Professional Development', description: 'Get yourself a better job', organizer: codeandsupply)

Opportunity.create(name: 'Carpentry courses', organizer: saxifrage)

OpportunityInstance.create(name: 'Intro to MVC', opportunity: starterseries, starts_at: Time.now+1.hours, ends_at: Time.now + 2.hours, location: cloakroom, topic: software)
