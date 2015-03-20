---
layout: page
title: Roadmap
---
###Areas of Work###

1.  Setup Ruby on Rails back-end with Database
2.  Connect AngularJS data-binding
3.  Design and Implement Pages
4.  Copy-writing and media assets

###Assemble the Team###

Back-end: RoR (Justin)
Front-end Data-binding to RoR with Angular (Matthew)
Front-end Design/Implementation (Cameron)
Project Design/Management/Documentation/Open-Source (Chad)
Project Lead, Design, Copywriting and Payer-of-Bills (Tim)

*   Chad Whitacre (Open-Source Design, Project Manage, Documention)
*   Justin Reese (Ruby on Rails and DB)
*   Matthew Vita (AngularJS and DB)
*   Cameron Scott (Front-End)
*   [Tim Cook](tim@sproutfund.org) (Sprout Fund, Project Lead, Design, Copywriting)
*   [Ryan Coon](ryan@sproutfund.org) (Sprout Fund, Communications, Copywriting, Media Assets)
*   Matt Hannigan (Sprout Fund Deputy Director)

###Build###

_Create great documentation as we go, both within code and on this site._
_Below are "Stages" to sort the work into high-level buckets, for actual development we'll define weekly Sprints by using the Milestones tool with Github Issues._


#####Stage One####

1.  Bootstrapping the Application
2.  Connecting Angular resources to the API - 8 hours
3.  Creating templates for modifying the resources - 10 hours
4.  Creating templates to display the resources - 8 hours
5.  Managing the large dataset problem - 10 hours
6.  Implementing a design (back-end)- 4 hours

#####Stage Two#####

1.  Handling user logins - 4 hours
2.  Handling admin logins - 2 hours
3.  Creating permission structure - 4 hours
4.  Creating a user dashboard - 6 hours

#####Stage Three#####

1.  Creating an admin dashboard - 6 hours
2.  Implementing Badge creation/issuing tools - ?

###Front-End Design###

#####Stage One#####

1.  Update existing pages as placeholder marketing pages.
2.  Create design and templates for all static pages and sub-pages:

    1.  Home
    2.  About
    3.  How it Works
    4.  For Learners/Families/Educators
    5.  FAQs
    6.  Footer
    7.  Contact Page
    8.  Privacy Policy and Terms of Service

3.  Build on and implement Explore page assets
4.  Build on and implement Organization page assets from Adjust Creative
5.  Design and implement Badges page and individual Badge pages.
6.  Build on and implement "Digital Challenges" pages assets from Adjust Creative

#####Stage Two#####

1.  Design and implement buttons and modal for log-in and Forgot Password/Username process.
2.  Design and implement Sign-Up form and completion pages
3.  Design and implement organization account dashboard pages based on assets from Adjust Creative.
4.  Design and implement badge creation and issuing tools based on assets from Adjust Creative.
5.  Design and implement learner account dashboard pages based on organization account pages.
6.  Clean-up and prettify cityascampus.org pages and sub-page templates.

#####Stage Three#####

1.  Design and Implement admin dashboard (could utilize a template/theme to make this easy, doesn't need to match existing site design, or could be built with Adjust Creative assets as reference.)

###Copy-writing###

1.  Update existing pages as placeholder marketing pages.
2.  Home page
3.  About pages
4.  How it Works pages
5.  FAQs
6.  Fill in additional content (footer, etc.)
7.  Populate InsideCOL pages for Contributors/Documentation

    1.  Welcome
    2.  Mission
    3.  Brand Guidelines
    4.  Audience
    5.  Product Overview
    6.  System Architecture
    7.  Source Code
    8.  HowTo:
        1.  Contribute to this Project
        2.  Fork this Project
        3.  etc. etc. (all major actions within the site)
    9.  Appendices
        1.  Glossary
        2.  Communication Channels
        3.  Main Contributors
        4.  Partners and Supporters
        5.  Contributor Chatroom (request Slack invite)
        6.  [Admin Access?](http://inside.gratipay.com/appendices/access)

###Other Projects###

_Many of these are not immediate priorities, just listing them here for future reference._

1.  Embed tool
2.  Event import tool
3.  Resource Map/Pathway Visualization Template
4.  Explore by Map
5.  Create Scope of Work for Custom Library Module
6.  Resource ranking functionality.

####Information Architecture####

_Conversation on this [here](https://github.com/sproutfund/pghcityoflearning.org/issues/1).
*See [features list](https://docs.google.com/document/d/1r_wGaV0qj2UQPVxGCJv54DlY4ihQDGhidM6-fiQSE4Y/pub) as a reference._

```

    Pgh City of Learning
      Explore (http://test.explorechi.org/adjust/page-explore.php)
        Maps (drop-down in Nav from Explore AND link on Explore Page)
          Map (Visual that maps Opportunities in specific order)
            Opportunity
             etc.  
        Opportunities
          Digital Challenges
            Title/Description/Image
            Location/URL
            Associated Resources
            Associated Badges
            Keep Exploring
          Opportunity
            Title/Description/Image
            Time & Place
            Registration/Learn More
            Associated Badges
            Map
            Keep Exploring
        Badges (drop-down in Nav from Explore AND link on Explore Page)
          Categories
            Badge
              Title/Description/Image
              Who Can Help Me Earn This Badge?
              How Is This Badge Earned?
      How It Works
        General Description
          Search for Things to Do
          Connect to a Citywide Campus
          Earn Badges
          Level Up
          Discover Learning Pathways
          Connect to College and Career
        For Learners
        For Families
          Find Things for Your Kids To Do
          Discover Personalized Learning Pathways
          Recognize New Skills & Competencies
        For Educators
        F.A.Q.s
          FAQ (maybe use Explore page UI to categorize FAQs)
            Question
            Answer
      About
        What is the Pittsburgh City of Learning?
        Why is Pittsburgh doing this?
          To Connect Learning (We Learn Everywhere based on our Interests and Relationships)
          Experience Discovery
          Workforce Preparedness
          Learning-Loss Prevention
          Leveling the Playing Field
        Partners
          Cities of Learning
          Participating Organizations
          Partners
          Supporters
        Questions & Feedback?
    Join Now
      Sign-up Form
    Log In
      Log-in Modal or Form
      Forgot password?
      Forgot username?
    Footer
      FAQ (Make this a top-level button and Partner links tertiary)
      Contribute (http://inside.gratipay.com/) — (Make this a top-level button and Partner links tertiary)
      Partner Links
      License (link to Github Repo)
      Contact
      Privacy Policy (maybe combine with ToS)
      Terms of Service (maybe combine with Privacy Policy)
      Back to the top
    ——Social Media links. Either in footer or nav?

```
