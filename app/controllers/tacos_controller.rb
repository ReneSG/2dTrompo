class TacosController < ApplicationController

  def index
    respond_with Taco.all
  end

  def show
    respond_with Taco.find(params[:id])
  end

  def create
    respond_with Taco.create(params[:taco])
  end

  def update
    respond_with Taco.update(params[:id], params[:taco])
  end

  def destroy
    respond_with Taco.destroy(params[:id])
  end

  private

    # Never trust parameters from the scary internet, only allow the white list through.
    def taco_params
      params.require(:taco).permit(:name, :image, :rating, :lattitude, :longitude)
    end
end
