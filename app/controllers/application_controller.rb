class ApplicationController < ActionController::Base
    protect_from_forgery with: :exception
    skip_before_action :verify_authenticity_token
    helper_method :current_user, :logged_in?
    before_action :current_user
    before_action :require_logged_in, except: [:new, :create, :home, :gcreate]
  
    def logged_in?
      !!current_user
    end
  
    private
    def require_logged_in
      binding.pry
      redirect_to root_path unless logged_in?
    end
  
    def current_user
      @current_user ||= User.find(session[:user_id]) if session[:user_id]
    end
    helper_method :current_user
  
end
