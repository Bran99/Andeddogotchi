class SessionsController < ApplicationController
  def current
    if current_user
      render json: {
        user: current_user,
        gotchi: current_user.gotchi
      }
    else
      render json: {
        user: nil,
        gotchi: nil
      }
    end
  end

  def create
    @user = User.find_by(name: user_params[:name])

    if @user && @user.authenticate(user_params[:password]) && @user.gotchi
      login!(@user)
      levelup!(@user)

      @gotchi = @user.gotchi

      helper_shown

      respond_to do |format|
        format.html { redirect_to new_gotchis_path }
        format.json { render json: {
            user: @user,
            gotchi: @gotchi
          }
        }
      end

    elsif @user && @user.authenticate(user_params[:password])
      login!(@user)

      @gotchi = Gotchi.new(user: @user)
      @gotchi.fullity = 0
      @gotchi.rest = 0
      @gotchi.save

      respond_to do |format|
        format.html { redirect_to new_gotchis_path }
        format.json { render json: {
            user: @user,
            gotchi: @gotchi
          }
        }
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

  def check
    if current_user
      render json: {
        user: current_user,
        gotchi: current_user.gotchi
      }
    else
      render json: {
        user: nil,
        gotchi: nil
      }
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :password)
  end

end
