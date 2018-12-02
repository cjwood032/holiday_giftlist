module GiftsHelper
    def user_gifts_table(user)
        if @friend
            render partial: "gifts/table", locals: {user: @user, friends: user.friends, friend: @friend, gifts: user.gifts}
        else 
            if user.gifts.size == 0
                content_tag(:p, "You haven't found any gifts".html_safe)
            else
                user.friends.each do |f|
                    render partial: "gifts/table", locals: {user: @user, friends: user.friends, friend: f, gifts: user.gifts}
                end
            end
        end
      end

    def friend_selection(user)
        render partial: "gifts/selection", locals: {user: @user, friends: user.friends, gifts: user.gifts}
    end
end