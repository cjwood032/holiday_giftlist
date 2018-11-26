class FriendsController < ApplicationController
    def index
        #binding.pry
        user=User.find(params[:user_id])
        @friends=user.friends
        respond_to do |format|
            format.html {:index}
            format.json {render json: @friends, status:200}
        end
    end
    def show
        @friend = Friend.find(params[:id])
        respond_to do |format|
            format.json {render json: @friend, status: 200}
            format.html 
        end
    end
    def new
        @friend=Friend.new
        #binding.pry
    end
    def create
        @friend = Friend.create(friend_params)
        @friend.user=current_user
        @friend.save
        render json: @friend, status: 200
    end
    def update
        @friend = Friend.find(params[:id])
        @friend.update(friend_params)
        render json: @friend, status: 200
    end
    def destroy
        @friend = Friend.find(params[:id])
        @friend.delete
        render json: {friendId: @friend.id}
    end
    private
    def friend_params
        params.require(:friend).permit(:name) 
    end
end