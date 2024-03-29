require 'test_helper'

class TacosControllerTest < ActionController::TestCase
  setup do
    @taco = tacos(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:tacos)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create taco" do
    assert_difference('Taco.count') do
      post :create, taco: { comment_id: @taco.comment_id, image: @taco.image, lattitude: @taco.lattitude, longitude: @taco.longitude, name: @taco.name, rating: @taco.rating }
    end

    assert_redirected_to taco_path(assigns(:taco))
  end

  test "should show taco" do
    get :show, id: @taco
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @taco
    assert_response :success
  end

  test "should update taco" do
    patch :update, id: @taco, taco: { comment_id: @taco.comment_id, image: @taco.image, lattitude: @taco.lattitude, longitude: @taco.longitude, name: @taco.name, rating: @taco.rating }
    assert_redirected_to taco_path(assigns(:taco))
  end

  test "should destroy taco" do
    assert_difference('Taco.count', -1) do
      delete :destroy, id: @taco
    end

    assert_redirected_to tacos_path
  end
end
