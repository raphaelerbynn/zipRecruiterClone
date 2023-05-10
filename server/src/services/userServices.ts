import { User } from "../models"


const _findUserByEmail = async (userMail: string, userRole: string) => {
    return await User.findOne({
        email: userMail,
        role: userRole
    });
};

const _createUser = async (userData: {}) => {
    return await User.create(userData);
};

export {
    _findUserByEmail,
    _createUser
}

