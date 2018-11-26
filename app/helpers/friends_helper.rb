module FriendsHelper
    def friends_table(user)
            render partial: "friends/table", locals: {friends: user.friends}
    end
end