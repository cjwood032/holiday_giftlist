class UsersController < ApplicationController
    def index
    end
    def show
        @user = User.find(params[:id])
        #render json: @user, status: 200
    end
    def create
        @user = User.create(user_params)
        redirect_to user_path(@user)
    end
    def update
        @user = User.find(params[:id])
        @user.update(user_params)
        render json: @user, status: 200
    end
    def destroy
        @user = User.find(params[:id])
        @user.delete
        render json: {userId: @user.id}
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