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
    # if Parameters["health_action"] == "brain"
      puts "hi"
      render json: 'hey'
    # end
  end

  def destroy(user)
    user.gotchi.destroy
  end

end
