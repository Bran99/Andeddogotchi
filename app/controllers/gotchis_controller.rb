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
    response = {
      user: @user,
      gotchi: @user.gotchi
    }
    puts response
    respond_to do |format|
      format.html { redirect_to root_path }
      format.json { render json: response }
    end
  end

  def has_gotchi
    @user = User.find_by(id: session[:current_user_id])
    session[:current_gotchi_age] = @user.gotchi.age
    respond_to do |format|
      format.html { redirect_to root_path }
      format.json { render json: @user }
    end
  end

  def create
    redirect_to new_gotchis_path
  end

  def update
    @gotchi = current_user.gotchi || {message: "I'm dead"}
    if gotchi_params[:health_action] == "brain"
      @gotchi.fullity += 33
      if @gotchi.fullity > 100
        @gotchi.fullity = 100
      end
    elsif gotchi_params[:health_action] == "foot"
      @gotchi.fullity += 20
      if @gotchi.fullity > 100
        @gotchi.fullity = 100
      end
    elsif gotchi_params[:health_action] == "blood_bath"
      @gotchi.rest += 20
      if @gotchi.rest > 100
        @gotchi.rest = 100
      end
    elsif gotchi_params[:health_action] == "tick"
      @gotchi.fullity -= 33
      @gotchi.rest -= 20
      if @gotchi.fullity < 0
        @gotchi.fullity = 0
      elsif @gotchi.rest < 0
        @gotchi.rest = 0
      end
    end

    @gotchi.save
    
    respond_to do|format|
      format.json { render json: @gotchi }
    end
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
