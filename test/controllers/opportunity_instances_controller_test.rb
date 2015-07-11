require 'test_helper'

class OpportunityInstancesControllerTest < ActionController::TestCase
  include Devise::TestHelpers

  setup do
    @opportunity_instance = opportunity_instances(:one)
    sign_in users(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:opportunity_instances)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create opportunity_instance" do
    assert_difference('OpportunityInstance.count') do
      post :create, opportunity_instance: { address: @opportunity_instance.address, city: @opportunity_instance.city, contact_email: @opportunity_instance.contact_email, contact_name: @opportunity_instance.contact_name, contact_phone: @opportunity_instance.contact_phone, description: @opportunity_instance.description, ends_at: @opportunity_instance.ends_at, extra_data: @opportunity_instance.extra_data, hide: @opportunity_instance.hide, hide_reason: @opportunity_instance.hide_reason, is_online: @opportunity_instance.is_online, location_name: @opportunity_instance.location_name, logo_url: @opportunity_instance.logo_url, max_age: @opportunity_instance.max_age, min_age: @opportunity_instance.min_age, name: @opportunity_instance.name, online_address: @opportunity_instance.online_address, price_level: @opportunity_instance.price_level, program_type: @opportunity_instance.program_type, registration_deadline: @opportunity_instance.registration_deadline, registration_url: @opportunity_instance.registration_url, registration_url: @opportunity_instance.registration_url, starts_at: @opportunity_instance.starts_at, state: @opportunity_instance.state, zipcode: @opportunity_instance.zipcode }
    end

    assert_redirected_to opportunity_instance_path(assigns(:opportunity_instance))
  end

  test "should show opportunity_instance" do
    get :show, id: @opportunity_instance
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @opportunity_instance
    assert_response :success
  end

  test "should update opportunity_instance" do
    patch :update, id: @opportunity_instance, opportunity_instance: { address: @opportunity_instance.address, city: @opportunity_instance.city, contact_email: @opportunity_instance.contact_email, contact_name: @opportunity_instance.contact_name, contact_phone: @opportunity_instance.contact_phone, description: @opportunity_instance.description, ends_at: @opportunity_instance.ends_at, extra_data: @opportunity_instance.extra_data, hide: @opportunity_instance.hide, hide_reason: @opportunity_instance.hide_reason, is_online: @opportunity_instance.is_online, location_name: @opportunity_instance.location_name, logo_url: @opportunity_instance.logo_url, max_age: @opportunity_instance.max_age, min_age: @opportunity_instance.min_age, name: @opportunity_instance.name, online_address: @opportunity_instance.online_address, price_level: @opportunity_instance.price_level, program_type: @opportunity_instance.program_type, registration_deadline: @opportunity_instance.registration_deadline, registration_url: @opportunity_instance.registration_url, registration_url: @opportunity_instance.registration_url, starts_at: @opportunity_instance.starts_at, state: @opportunity_instance.state, zipcode: @opportunity_instance.zipcode }
    assert_redirected_to opportunity_instance_path(assigns(:opportunity_instance))
  end

  test "should destroy opportunity_instance" do
    assert_difference('OpportunityInstance.count', -1) do
      delete :destroy, id: @opportunity_instance
    end

    assert_redirected_to opportunity_instances_path
  end
end
