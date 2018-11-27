class GiftsController< ApplicationController
    def new
        @user = User.find(params[:user_id])
        @gift=Gift.new
        if params[:friend_id]
            @friend=Friend.find(params[:friend_id])
        end
        #binding.pry
    end
    def create
        @gift = Gift.create(gift_params)
        friends=params[:gift][:friend_ids].drop_while{|x| x==''}
        @gift.friends=friends.map{|x| Friend.find(x.to_i)}
    end

    def index
        user=User.find(params[:user_id])
        @friends=user.friends
        @gifts=user.gifts
        respond_to do |format|
            format.html {:index}
            format.json {render json: @gifts, status:200}
        end
    end

    def show
        @gift = Gift.find(params[:id])
        respond_to do |format|
            format.json {render json: @gift, status: 200}
            format.html
        end
    end

    def update
        @gift = Gift.find(params[:id])
        @gift.update(gift_params)
        render json: @gift, status:202
    end

    def delete
        @gift = Gift.find(params[:id])
        @gift.delete
        redirect_to user_gifts_path
    end
    private
    def gift_params
        #binding.pry
        params.require(:gift).permit(
        :name,
        :link,
        :price,
        :friend_ids
        )  
    end
end
