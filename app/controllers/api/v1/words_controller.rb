class Api::V1::WordsController < ApplicationController

  before_action :find_word, only: [:update]

  def index
    @word = Word.all.sample
    render json: @word, include: ['users']
  end

  def update
    @word.update(word_params)
    if @word.save
      render json: @word, status: :accepted
    else
      render json: { errors: @word.errors.full_messages }, status: :unprocessible_entity
    end

  end

  private

  def word_params
    params.permit(:id, :label, :user_ids)
  end

  def find_word
    @word = Word.find(params[:id])
  end


end
