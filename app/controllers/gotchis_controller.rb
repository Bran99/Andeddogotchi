class GotchisController < ApplicationController
  def new
    @user = User.find_by(id: session[:current_user_id])
    unless @user.gotchi
      @user.gotchi = Gotchi.new
      @user.gotchi.save
    end
    session[:current_gotchi_age] = @user.gotchi.age
    redirect_to root_path
  end

  def destroy(user)
    user.gotchi.destroy
  end

end
