import Mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

export type PhotoCategory = "photo" | "art" | "design";

export interface IPhotoModel extends Mongoose.Document {
    uniqueNum: number;
    url: string;
    name: string;
    description: string;
    price: number;
    owner_id: Mongoose.Types.ObjectId;
    wide_screen: boolean;
    date_added: Date;
    category: PhotoCategory;
}

interface IPaginated<T extends Mongoose.Document> extends Mongoose.PaginateModel<T> {}

const PhotoScheme = new Mongoose.Schema({
    uniqueNum:   { type: Number, required: true, unique: true },
    url:         { type: String, required: true },
    name:        { type: String, required: true },
    description: { type: String, required: true },
    price:       { type: Number, required: true },
    owner_id:    { type: Mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    wide_screen: { type: Boolean, required: true },
    date_added:  { type: Date,   default: Date.now() },
    category:    { type: String, required: true, enum: [ "photo", "art", "design" ] }
});

PhotoScheme.index({ name: "text", description: "text" });

PhotoScheme.plugin(mongoosePaginate);

const PhotoModel = Mongoose.model<IPhotoModel>("Photo", PhotoScheme) as IPaginated<IPhotoModel>;

class Photo {
    static async getAll(
        offset = 0, limit = -1, sortAsc?: boolean, query?: string, category?: string[],
        widescreen?: boolean, owner?: string
    ) {
        const filterParamObject: {[k: string]: any} = {};
        if (owner) {
            filterParamObject.owner_id = new Mongoose.Types.ObjectId(owner);
        }
        if (typeof widescreen !== "undefined") {
            filterParamObject.wide_screen = widescreen;
        }
        if (category) {
            filterParamObject.category = { $in: category };
        }
        if (query) {
            const regexp = new RegExp(query, "i");
            filterParamObject.$or = [
                { name: { $regex: regexp } }, { description: { $regex: regexp } }
            ];
        }
        limit = limit <= 0 ? 10 : limit;
        offset = offset < 0 ? 0 : offset;
        const sort = typeof sortAsc === "boolean"
            ? { date_added: sortAsc ? "asc" : "desc" }
            : undefined;
        console.log(filterParamObject, sort);
        const result = await PhotoModel.paginate(filterParamObject, { offset, limit, sort });
        if (result !== null) {
            const items = result.docs.map((x) => new Photo(
                x.id, x.uniqueNum, x.url, x.name, x.description, x.price, x.owner_id.toHexString(),
                x.wide_screen, x.date_added, x.category
            ));
            return {
                items,
                total: result.totalDocs,
                limit: result.limit,
                offset: result.offset,
            };
        }
        throw Error("Couldn't fetch all photos");
    }

    static async getByNumber(uniqueNum: number) {
        const model = await PhotoModel.find({ uniqueNum });
        if (!model || !model[0]) {
            return null;
        }
        const { id, url, name, description, price, owner_id, wide_screen,
            date_added, category } = model[0];
        return new Photo(
            id, uniqueNum, url, name, description, price, owner_id.toHexString(), wide_screen,
            date_added, category
        );
    }

    static async insert(x: Photo) {
        const photo = await new PhotoModel(x).save();
        return photo._id;
    }

    id: string;
    uniqueNum: number;
    url: string;
    name: string;
    description: string;
    price: number;
    owner_id: string;
    wide_screen: boolean;
    date_added: Date;
    category: PhotoCategory;

    constructor(
        id: string,
        uniqueNum: number,
        url: string,
        name: string,
        description: string,
        price: number,
        owner_id: string,
        wide_screen: boolean,
        date_added: Date,
        category: PhotoCategory
    ) {
        this.id = id;
        this.uniqueNum = uniqueNum;
        this.url = url;
        this.name = name;
        this.description = description;
        this.price = price;
        this.owner_id = owner_id;
        this.wide_screen = wide_screen;
        this.date_added = date_added;
        this.category = category;
    }
}

export default Photo;
