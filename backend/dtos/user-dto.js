class UserDto {
    id;
    phone;
    name;
    pic;
    activated;
    createdAt;

    constructor(user) {
        this.id = user._id;
        this.phone = user.phone;
        this.name = user.name;
        this.pic = user.pic
        ? `${process.env.BASE_URL}${user.pic}`
            : null;
        this.activated = user.activated;
        this.createdAt = user.createdAt;
    }
}

module.exports = UserDto;