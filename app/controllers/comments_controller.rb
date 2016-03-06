class CommentsController < ApplicationController
  
  def index
    respond_with Comment.all
  end

  def show
    respond_with Comment.find(params[:id])
  end

  def create
    respond_with Comment.create(params[:comment])
  end

  def update
    respond_with Comment.update(params[:id], params[:comment])
  end

  def destroy
    respond_with Comment.destroy(params[:id])
  end


  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def comment_params
      params.require(:comment).permit(:user_id, :body, :rating, :taco_id)
    end
end
