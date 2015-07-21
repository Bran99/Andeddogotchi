class SessionsController < ApplicationController
  def create
    @user = User.find_by(name: user_params[:name])

    if @user && @user.authenticate(user_params[:password]) && @user.gotchi
      login!(@user)
      levelup!(@user)
      fullData = { user: @user,
                   gotchi: @user.gotchi
                 }
      respond_to do |format|
        format.html { redirect_to has_gotchi_path }
        format.json { render json: fullData }
      end
    elsif @user && @user.authenticate(user_params[:password])
      login!(@user)
      levelup!(@user)
      respond_to do |format|
        format.html { redirect_to new_gotchis_path }
        format.json { render json: @user }
      end
    else
      flash[:message] = "Incorrect login information!  Try again..."
      respond_to do |format|
        format.html { redirect_to root_path }
        format.json { render json: @user }
      end
    end
  end

  def destroy
    logout!
    respond_to do |format|
      format.html { redirect_to root_path }
      format.json { render json: { success: "User has logged out!" } }
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :password)
  end

end
