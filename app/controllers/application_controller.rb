class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :current_user
  helper_method :current_gotchi_age

  def main
    #default password for facebook users
    @secret = 'aaratiisthebombdiggity!'
    render 'layouts/main'
  end

  private

  def login!(user)
    user.last_login = Time.now
    session[:current_user_id] = user.id
  end

  def logout!
    session[:current_user_id] = nil
    session[:current_gotchi_age] = nil
  end

  def current_user
    @current_user ||= User.find_by(id: session[:current_user_id])
  end

  def current_user?
    !!current_user
  end

  def helper_shown
    helper_shown = true;
  end

  def current_gotchi_age
    @current_gotchi_age ||= session[:current_gotchi_age]
  end

  def require_current_user
    unless current_user
      flash[:message] = "You must be logged in!"
      redirect_to new_session_path
    end
  end

  def levelup!(user)
    if user.last_login - user.created_at > 2.day  && user.gotchi.age == 2
      user.gotchi.age == 1
      session[:current_gotchi_age] = user.gotchi.age
    elsif user.last_login - user.created_at > 1.day && user.gotchi.age == 1
      user.gotchi.age == 1
      session[:current_gotchi_age] = user.gotchi.age
    end
  end
end
