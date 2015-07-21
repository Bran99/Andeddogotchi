class UsersController < ApplicationController
  def create
    @user = User.new(user_params)

    if @user.save
      login!(@user)
      respond_to do |format|
        format.html { redirect_to new_gotchis_path }
        format.json { render json: @user }
      end
    else
      flash[:message] = @user.errors.full_messages_to_sentence
      respond_to do |format|
        format.html { redirect_to new_user_path }
        format.json { render json: @user }
      end
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :password, :gotchi_name)
  end
end
