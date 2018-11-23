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
        binding.pry
        current_user = @user
        if @user && @user.authenticate(params[:password])
          session[:user_id] = @user.id
          redirect_to user_path(@user), notice: "Welcome back!"
        else
          redirect_to signin_path, notice: "Name or password is incorrect"
        end
      end


      private
      
      def user_params
        params.require(:user).permit(:name, :email, :role, :password, :password_confirmation, :admin)
      end
      