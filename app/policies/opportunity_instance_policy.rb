class OpportunityInstancePolicy < ApplicationPolicy
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
      OpportunityInstance.joins(:opportunity)
                         .where(opportunities: { organizer_id: user.organizers })
    end
  end
end
