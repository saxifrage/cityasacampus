require 'test_helper'

class PathwaysControllerTest < ActionController::TestCase
  setup do
    @pathway = pathways(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:pathways)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create pathway" do
    assert_difference('Pathway.count') do
      post :create, pathway: {  }
    end

    assert_redirected_to pathway_path(assigns(:pathway))
  end

  test "should show pathway" do
    get :show, id: @pathway
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @pathway
    assert_response :success
  end

  test "should update pathway" do
    patch :update, id: @pathway, pathway: {  }
    assert_redirected_to pathway_path(assigns(:pathway))
  end

  test "should destroy pathway" do
    assert_difference('Pathway.count', -1) do
      delete :destroy, id: @pathway
    end

    assert_redirected_to pathways_path
  end
end
