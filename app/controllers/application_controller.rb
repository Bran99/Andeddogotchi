class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :current_user

  def main
    #default password for facebook users
    @secret = 'aaratiisthebombdiggity!'
    render 'layouts/main'
  end

  private

  def login!(user)
    user.last_login = Time.now
    if user.last_login - user.created_at > 1.day
      levelup!(user)
    elsif user.last_login - user.created_at > 2.day
      levelup!(user)
    end
    session[:current_user_id] = user.id
  end

  def logout!
    session[:current_user_id] = nil
  end

  def current_user
    @current_user ||= User.find_by(id: session[:current_user_id])
  end

  def require_current_user
    unless current_user
      flash[:message] = "You must be logged in!"
      redirect_to new_session_path
    end
  end

  def levelup!(user)
    user.gotchi.age += 1
  end
end
