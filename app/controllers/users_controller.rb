class UsersController < ApplicationController
    def show
        @user = User.find(params[:id])
        @friends=@user.friends.select{|f| f.gift_status= "No Gift"}
    end

    def create
        @user = User.create(user_params)
        @user.amount_spent=0
        respond_to do |format|
            if @user.save
              session[:user_id] = @user.id
              format.html { redirect_to user_path(@user) }
            else
              format.html { render :new }
            end
          end
    end
  
    def new
        @user = User.new
        current_user=@user
      end
    private
    def user_params
        params.require(:user).permit(:name, :email, :budget, :password, :password_confirmation)
      end
end