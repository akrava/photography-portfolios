import Mongoose from "mongoose";
import Photo from "@models/photo";
import mongoosePaginate from "mongoose-paginate-v2";

export type UserCategory = "photographer" | "artist" | "designer";

export interface IUserModel extends Mongoose.Document {
    login: string;
    password: string;
    isUserCommon: boolean;
    fullname: string;
    registered: Date;
    avaUrl: string;
    ordered_photos: Mongoose.Schema.Types.ObjectId[];
    description: string;
    category: UserCategory;
    date_free: Date[];
    date_orderd: Array<{ who: Mongoose.Schema.Types.ObjectId, date: Date }>;
}

interface IPaginated<T extends Mongoose.Document> extends Mongoose.PaginateModel<T> {}

const UserScheme = new Mongoose.Schema({
    login:          { type: String, required: true, unique: true },
    password:       { type: String, required: true },
    isUserCommon:   { type: Boolean, required: true },
    fullname:       { type: String, required: true },
    registered:     { type: Date,   default: Date.now(), required: true },
    avaUrl:         { type: String, default: "/userpic.png", required: true },
    ordered_photos: [{ type: Mongoose.Schema.Types.ObjectId, ref: "Photo" }],
    description:    { type: String },
    category:       { type: String, default: "photographer", enum: [ "photographer", "artist", "designer" ] },
    date_free:      [{ type: Date }],
    date_orderd:    [{ who: { type: Mongoose.Schema.Types.ObjectId, ref: "User" }, date: { type: Date } }]
});

UserScheme.plugin(mongoosePaginate);

const UserModel = Mongoose.model<IUserModel>("User", UserScheme) as IPaginated<IUserModel>;

class User {
    static async getAll(
        offset = 0, limit = -1, photographers = false, category?: string, query?: string
    ) {
        const filterParamObject: {[k: string]: any} = {};
        if (photographers) {
            filterParamObject.isUserCommon = false;
        }
        if (category) {
            filterParamObject.category = { $in: category };
        }
        if (query) {
            const regexp = new RegExp(query, "i");
            filterParamObject.$or = [
                { fullname: { $regex: regexp } }, { description: { $regex: regexp } }
            ];
        }
        limit = limit <= 0 ? 10 : limit;
        offset = offset < 0 ? 0 : offset;
        console.log(filterParamObject);
        const result = await UserModel.paginate(filterParamObject, { offset, limit });
        if (result !== null) {
            const items = result.docs.map((x) => new User(
                x.id, x.login, x.password, x.category, x.isUserCommon, x.fullname,
                x.registered, x.avaUrl
            ));
            return {
                items,
                total: result.totalDocs,
                limit: result.limit,
                offset: result.offset,
            };
        }
        throw Error("Couldn't fetch all users");
    }

    static async getById(id: string) {
        const model = await UserModel.findById(id);
        if (!model) {
            return null;
        }
        const { login, password, category, isUserCommon, fullname, registered, avaUrl } = model;
        return new User(
            id, login, password, category, isUserCommon, fullname, registered, avaUrl
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
            role: x.isUserCommon, fullname: x.fullname, avaUrl: x.avaUrl, password: x.password
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
    category: string;
    isUserCommon: boolean;
    fullname: string;
    registered?: Date;
    avaUrl?: string;

    constructor(
        id: string,
        login: string,
        password: string,
        category: string,
        isUserCommon: boolean,
        fullname: string,
        registered?: Date,
        avaUrl?: string
    ) {
        this.id = id;
        this.login = login;
        this.password = password;
        this.isUserCommon = isUserCommon;
        this.category = category;
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
