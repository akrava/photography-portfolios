import Mongoose from "mongoose";
import Photo from "@models/photo";

export interface IUserModel extends Mongoose.Document {
    login: string;
    password: string;
    role: number;
    fullname: string;
    registered: Date;
    avaUrl: string;
    ordered_photos: Mongoose.Schema.Types.ObjectId[];
}

const UserScheme = new Mongoose.Schema({
    login:          { type: String, required: true, unique: true },
    password:       { type: String, required: true },
    role:           { type: Number, required: true },
    fullname:       { type: String, required: true },
    registered:     { type: Date,   default: Date.now(), required: true },
    avaUrl:         { type: String, default: "/userpic.png", required: true },
    ordered_photos: [{ type: Mongoose.Schema.Types.ObjectId, ref: "Photo" }]
});

const UserModel = Mongoose.model<IUserModel>("User", UserScheme);

class User {
    static async getAll() {
        const model = await UserModel.find();
        return model.map((x) => new User(
            x.id, x.login, x.password, x.role, x.fullname, x.registered, x.avaUrl
        ));
    }

    static async getById(id: string) {
        const model = await UserModel.findById(id);
        if (!model) {
            return null;
        }
        const { login, password, role, fullname, registered, avaUrl } = model;
        return new User(
            id, login, password, role, fullname, registered, avaUrl
        );
    }

    static async getAllOrderedImages(id: string) {
        const model = await UserModel.findById(id).populate("ordered_photos");
        return model || null;
    }

    static async orderPhoto(idUser: string, numPhoto: number) {
        const model = await Photo.getByNumber(numPhoto);
        if (!model) {
            return null;
        }
        const property = { $push: { ordered_photos: model.id } };
        await UserModel.findByIdAndUpdate(idUser, property);
        return await User.getAllOrderedImages(idUser);
    }

    static async getByLogin(login: string) {
        const model = await UserModel.findOne({ login });
        if (!model) {
            return null;
        }
        return await User.getById(model.id);
    }

    static async insert(x: User) {
        const user = await new UserModel(x).save();
        return user._id;
    }

    static async update(x: User) {
        const property = { $set: {
            role: x.role, fullname: x.fullname, avaUrl: x.avaUrl, password: x.password
        }};
        UserModel.findByIdAndUpdate(x.id, property);
        return await User.getById(x.id);
    }

    static async delete(id: string) {
        await UserModel.findByIdAndRemove(id);
    }

    id: string;
    login: string;
    password: string;
    role: number;
    fullname: string;
    registered?: Date;
    avaUrl?: string;

    constructor(
        id: string,
        login: string,
        password: string,
        role: number,
        fullname: string,
        registered?: Date,
        avaUrl?: string
    ) {
        this.id = id;
        this.login = login;
        this.password = password;
        this.role = role;
        this.fullname = fullname;
        this.registered = registered;
        this.avaUrl = avaUrl;
    }

    async loadAvatarToStorage() {
        throw new Error("Not implemeted");
    }

    async deleteAvatarFromStorage() {
        throw new Error("Not implemeted");
    }
}

export default User;
