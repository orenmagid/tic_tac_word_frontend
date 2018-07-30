class Api::V1::UsersController < ApplicationController

   before_action :find_user, only: [:show]

  def index
    @users = User.all
    render json: @users

  end

  def show
    render json: @user
  end

  def create
    @user = User.new(user_params)
    if @user.save
      render json: @user, status: :accepted
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessible_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :id)

  end

  def find_user
    @user = User.find(params[:id])

  end

end
