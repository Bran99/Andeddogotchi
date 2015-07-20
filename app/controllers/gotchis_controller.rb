class GotchisController < ApplicationController
  protect_from_forgery with: :null_session
  before_action

  def new
    @user = User.find_by(id: session[:current_user_id])
    unless @user.gotchi
      @user.gotchi = Gotchi.new
      @user.gotchi.save
    end
    session[:current_gotchi_age] = @user.gotchi.age
    redirect_to root_path
  end

  def has_gotchi
    @user = User.find_by(id: session[:current_user_id])
    session[:current_gotchi_age] = @user.gotchi.age
    redirect_to root_path
  end

  def create
    redirect_to new_gotchis_path
  end

  def update
    @gotchi = current_user.gotchi
    if gotchi_params[:health_action] == "brain"
      @gotchi.fullity += 33
      @gotchi.save
    elsif gotchi_params[:health_action] == "blood_bath"
      @gotchi.rest += 20
      @gotchi.save
    elsif gotchi_params[:health_action] == "tick"
      @gotchi.fullity -= 33
      @gotchi.rest -= 20
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

  def levelup!
    if Time.now - current_user.gotchi.created_at > 2.day && current_user.gotchi.age == 2
      current_user.gotchi.age += 1
      session[:current_gotchi_age] = user.gotchi.age
    elsif Time.now - current_user.gotchi.created_at > 1.day && current_user.gotchi.age == 1
      current_user.gotchi.age += 1
      session[:current_gotchi_age] = user.gotchi.age
    end
  end

end
