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

    def edit
        @friend = Friend.find(params[:id])
    end
   
    def next
        @friend = Friend.find(params[:id])
        #binding.pry
        @next_friend=Friend.find(@friend.id.next)
        render json:@next_friend
    end
    def new
        @friend=Friend.new
    end

    def create
        @friend = Friend.create(friend_params)
        @friend.user=current_user
        @friend.gift_status="No Gift"
        @friend.amount_spent=0
        @friend.save
        render json: @friend, status: 200
    end

    def update
        @friend = Friend.find(params[:id])
        @friend.update(friend_params)
        render json: @friend, status: 200
    end

    def delete
        @friend = Friend.find(params[:id])
        @friend.delete
        redirect_to user_friends_path
    end

    private
    def friend_params
        params.require(:friend).permit(:name) 
    end
end