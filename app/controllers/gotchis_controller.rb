class GotchisController < ApplicationController
  protect_from_forgery with: :null_session

  def new
    @user = User.find_by(id: session[:current_user_id])
    puts @user.gotchi
    unless @user.gotchi
      @user.gotchi = Gotchi.new
      @user.gotchi.save
    end
    session[:current_gotchi_age] = @user.gotchi.age
    redirect_to root_path
  end

  def update
    @gotchi = current_user.gotchi
    if gotchi_params[:health_action] == "brain"
      @gotchi.fullity += 33
      @gotchi.save
    elsif gotchi_params[:health_action] == "tick"
      @gotchi.fullity -= 33
      @gotchi.save
    end

    render json: @gotchi
  end

  def destroy
    session[:current_gotchi_age] = nil
    current_user.gotchi.destroy

    render json: current_user
  end

  private
  def gotchi_params
    params.require(:gotchi).permit(:health_action)
  end

end
