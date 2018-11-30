module GiftsHelper
    def user_gifts_table(user)
        if user.gifts.size == 0
          content_tag(:p, "You haven't found any gifts".html_safe)
        else
          render partial: "gifts/table", locals: {user: user, friends: user.friends, gifts: user.gifts}
        end
      end
end