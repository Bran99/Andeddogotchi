class UsersController < ApplicationController
  def create
    @user = User.new(user_params)

    if @user.save
      login!(@user)
      # redirect_to 
      redirect_to root_path
    else
      flash[:message] = @user.errors.full_messages_to_sentence
      redirect_to new_user_path
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password, :gotchi_name)
  end
end
