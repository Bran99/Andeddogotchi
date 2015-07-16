class SessionsController < ApplicationController

  def create
    @user = User.find_by(name: user_params[:username])

    if @user.authenticate(user_params[:password])
      login!
      redirect_to user_path(@user.id)
    else
      flash[:message] = "Incorrect login information!  Try again..."
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
