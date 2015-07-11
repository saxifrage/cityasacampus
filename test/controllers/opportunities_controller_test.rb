require 'test_helper'

class OpportunitiesControllerTest < ActionController::TestCase
  include Devise::TestHelpers

  setup do
    @opportunity = opportunities(:one)
    sign_in users(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:opportunities)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create opportunity" do
    assert_difference('Opportunity.count') do
      post :create, opportunity: { address: @opportunity.address, city: @opportunity.city, contact_email: @opportunity.contact_email, contact_name: @opportunity.contact_name, contact_phone: @opportunity.contact_phone, description: @opportunity.description, ends_at: @opportunity.ends_at, extra_data: @opportunity.extra_data, hide: @opportunity.hide, hide_reason: @opportunity.hide_reason, is_online: @opportunity.is_online, location_name: @opportunity.location_name, logo_url: @opportunity.logo_url, max_age: @opportunity.max_age, min_age: @opportunity.min_age, name: @opportunity.name, online_address: @opportunity.online_address, price_level: @opportunity.price_level, program_type: @opportunity.program_type, registration_deadline: @opportunity.registration_deadline, registration_url: @opportunity.registration_url, registration_url: @opportunity.registration_url, starts_at: @opportunity.starts_at, state: @opportunity.state, zipcode: @opportunity.zipcode }
    end

    assert_redirected_to opportunity_path(assigns(:opportunity))
  end

  test "should show opportunity" do
    get :show, id: @opportunity
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @opportunity
    assert_response :success
  end

  test "should update opportunity" do
    patch :update, id: @opportunity, opportunity: { address: @opportunity.address, city: @opportunity.city, contact_email: @opportunity.contact_email, contact_name: @opportunity.contact_name, contact_phone: @opportunity.contact_phone, description: @opportunity.description, ends_at: @opportunity.ends_at, extra_data: @opportunity.extra_data, hide: @opportunity.hide, hide_reason: @opportunity.hide_reason, is_online: @opportunity.is_online, location_name: @opportunity.location_name, logo_url: @opportunity.logo_url, max_age: @opportunity.max_age, min_age: @opportunity.min_age, name: @opportunity.name, online_address: @opportunity.online_address, price_level: @opportunity.price_level, program_type: @opportunity.program_type, registration_deadline: @opportunity.registration_deadline, registration_url: @opportunity.registration_url, registration_url: @opportunity.registration_url, starts_at: @opportunity.starts_at, state: @opportunity.state, zipcode: @opportunity.zipcode }
    assert_redirected_to opportunity_path(assigns(:opportunity))
  end

  test "should destroy opportunity" do
    assert_difference('Opportunity.count', -1) do
      delete :destroy, id: @opportunity
    end

    assert_redirected_to opportunities_path
  end
end
