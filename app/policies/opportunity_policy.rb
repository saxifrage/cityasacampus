class OpportunityPolicy < ApplicationPolicy
  def create?
    user.organizers.include? record.organizer
  end

  def destroy?
    user.organizers.include? record.organizer
  end

  def edit?
    user.organizers.include? record.organizer
  end

  def new?
    user.organizers.include? record.organizer
  end

  def update?
    user.organizers.include? record.organizer
  end

  class Scope < Scope
    def resolve
      scope.where(organizer: user.organizers)
    end
  end
end
