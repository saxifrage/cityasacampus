class VenuePolicy < ApplicationPolicy

  class Scope < Scope
    def resolve
      Venue.where(organizer: user.organizers)
    end
  end

end
