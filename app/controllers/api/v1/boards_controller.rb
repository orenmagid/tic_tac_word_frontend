class Api::V1::BoardsController < ApplicationController

  before_action :find_board, only: [:show]

  def index
    render json: Board.all
  end

  def show

    render json: @board

  end

  def create
    @board = Board.new(board_params)
    if @board.save
      render json: @board, status: :accepted
    else
      render json: { errors: @board.errors.full_messages }, status: :unprocessible_entity
    end
  end

  private

  def board_params
    params.require(:board).permit(:user_id, :status, :score, :play_date, :r1c1,:r1c2,:r1c3,:r2c1,:r2c2,:r2c3,:r3c1,:r3c2,:r3c3)

  end

  def find_board
    @board = Board.find(params[:id])

  end
end
