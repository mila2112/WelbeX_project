 class BlogRepository {
     public readonly model: any;

    constructor(model: any) {
        this.model = model;
    }

    async create(data: object) {
        return this.model.create(data);
    }

    async update(cond: object, data: object) {
        return this.model.update(data, {
            where: cond, returning: true, new: true, plain: true,
        });
    }
}

export default BlogRepository;
