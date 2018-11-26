module FriendsHelper
    def user_friends_table(user)
        if user.friends.size == 0
          content_tag(:p, "You haven't saved any friends".html_safe)
        else
          render partial: "friends/table", locals: {user: user, friends: user.friends}
        end
      end
end