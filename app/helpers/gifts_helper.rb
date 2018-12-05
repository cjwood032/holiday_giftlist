module GiftsHelper
    def user_gifts_table(user)
        if @friend
            render partial: "gifts/table", locals: {user: @user, friends: user.friends, friend: @friend, gifts: @friend.gifts}
        else 
            if user.gifts.size == 0
                content_tag(:p, "You haven't found any gifts".html_safe)
            else
                user.friends.each do |f|
                    render partial: "gifts/table", locals: {user: @user, friends: user.friends, friend: f, gifts: f.gifts}
                end
            end
        end
    end
    def purchased_gifts
        gifts=@user.gifts
        gifts=gifts.reject{ |g| g.status!="purchased"}
        render partial: "gifts/purchased", locals: {user: @user, gifts: gifts}
    end
end