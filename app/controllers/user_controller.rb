class UserController < ApplicationController
    def index
    end
    def show
        @user = User.find(params[:id])
        render json: @user, status: 200
    end
    def create
        @user = User.create(user_params)
        render json: @user, status: 200
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
    private
    def user_params
        params.require(:user).permit(:body) #double check after creating form
    end
end