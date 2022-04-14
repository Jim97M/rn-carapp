const Room = require("../models/room");
const Message = require("../models/message");

exports.Get_Group_Room_Detail = async () => {
    try {
        const room = await Room.find({ name: "global" });
        return room[0];
    } catch (error) {
        return false;
    }
}

exports.Add_User_To_Room = async (roomID, userID) => {
    try {
        const response = await Room.findByIdAndUpdate(roomID, { $push: { users: [userID] } });
    } catch (error) {
        return false;
    }
}

exports.is_Individual_Room_Already_Exist = async (user1, user2) => {
    try {
        const response = await Room.find({ users: { $all: [user1, user2] }, group:false })
        if (response.length === 0) {
            return null;
        } else {
            return response;
        }
    } catch (error) {
        return false;
    }
};

exports.Create_Group_Room = async (groupName) => {
    try {
        const room = new Room({ users: [], group: true, name: groupName });
        await room.save();
        return true;
    } catch (error) {
        return false;
    }
}


exports.Create_Individual_Room = async (user1, user2) => {
    try {
        const room = new Room({ users: [user1, user2] });
        const response = await room.save();
        return response;
    } catch (error) {
        return false;
    }
};

exports.is_Group_Room_Already_Exist = async (groupName) => {
    try {
        const room = await Room.find({ name: groupName });
        if (room.length === 0) {
            return false;
        }
        return true;
    } catch (error) {
        return false;
    }
};