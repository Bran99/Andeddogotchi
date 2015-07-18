class SessionsController < ApplicationController
  def create
    @user = User.find_by(name: user_params[:name])

    if @user && @user.authenticate(user_params[:password]) && @user.gotchi
      login!(@user)
      levelup!(@user)
      redirect_to has_gotchi_path
    elsif @user && @user.authenticate(user_params[:password])
      login!(@user)
      levelup!(@user)
      redirect_to new_gotchis_path
    else
      flash[:message] = "Incorrect login information!  Try again..."
      redirect_to root_path
    end
  end

  def destroy
    logout!
    redirect_to root_path
  end

  private

  def user_params
    params.require(:user).permit(:name, :password)
  end

end
