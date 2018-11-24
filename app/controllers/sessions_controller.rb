class SessionsController < ApplicationController
    def destroy
        session[:user_id] = nil
        redirect_to root_url
      end
    
      def new
        @user = User.new
        @users = User.all
      end
    
      def create
        @user = User.find_or_create_by(auth_hash)
        current_user = @user
        if @user && @user.authenticate(params[:password])
          session[:user_id] = @user.id
          redirect_to user_path(@user)
        else
          redirect_to signin_path
        end
      end


      private
      
      def auth
        request.env['omniauth.auth']
      end
      
      def auth_hash
        request.env['omniauth.auth']
      end
end 