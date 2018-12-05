class GiftsController< ApplicationController
    def new
        @user = User.find(params[:user_id])
        @gift=Gift.new
        if params[:friend_id]
            @friend=Friend.find(params[:friend_id])
        end
    end

    def create
        @gift = Gift.create(gift_params)
        @gift.user_id = params[:user_id]
        @gift.friend_id = params[:friend_id]
        @gift.quantity=0
        if @gift.save
            friend=Friend.find(params[:friend_id])
            friend.gifts<<@gift
            friend.save
            render json: @gift, status: 200
        end
    end

    def edit
        @gift = Gift.find(params[:id])  
    end

    def index
        @user=User.find(params[:user_id])
       
        if params[:friend_id]
            @friend=Friend.find(params[:friend_id]) 
            @gifts=@friend.gifts
            respond_to do |format|
                format.html {render :index}
            end
        else
            @friends=@user.friends
            @gifts=@user.gifts
            respond_to do |format|
                format.html {:index}
                format.json {render json: @gifts, status:200}
            end
        end
        
    end
    
    def next
        @gift = Gift.find(params[:id])
        @next_gift=Friend.find(@gift.id.next)
        render json:@next_gift
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
    
    def buy
        gift=Gift.find(params[:id])
        user=User.find(params[:user_id])
        friend=Friend.find(params[:friend_id])
        #gift updates
        if gift.status != "purchased"
            gift.status = "purchased"
        end
        gift.quantity+=1
        gift.save
        #friend updates
        if friend.gift_status=="No Gift"
            friend.gift_status="Gift Purchased"
        end
        friend.amount_spent+=gift.price
        friend.save
        #user updates
        user.amount_spent+=gift.price
        user.save
        respond_to do |format|
            format.html {redirect_to user_friends_path}
        end
    end

    private
    def gift_params
        params.require(:gift).permit(
        :name,
        :link,
        :price,
        :friend_ids
        )  
    end
end
