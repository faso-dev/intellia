import {Document, FilterQuery, Model, SortOrder} from 'mongoose';


export interface PaginationOptions<T extends Document> {
    page?: number;
    limit?: number;
    orderBy?: string;
    orderOrientation?: 'asc' | 'desc';
    search?: string;
    filters?: FilterQuery<T>;
}


interface PaginatedResponse<T> {
    page?: number;
    limit?: number;
    hasNextPage?: boolean;
    hasPrevPage?: boolean;
    nextPage?: number;
    prevPage?: number;
    total: number;
    docs: T[];
}


abstract class AbstractRepository<T extends Document> {
    protected model: Model<T>;
    protected orders: Record<string, SortOrder> = {};
    protected searchables: string[] = [];
    
    constructor(model: Model<T>) {
        this.model = model;
    }
    
    async findAll(options?: { orderBy?: string; orderOrientation?: 'asc' | 'desc' }): Promise<T[]> {
        const {orderBy, orderOrientation} = options || {};
        const sort = orderBy ? {[orderBy]: orderOrientation || 'asc'} : this.orders;
        
        return await this.model.find().sort(sort).exec();
    }
    
    async paginate(options?: PaginationOptions<T>): Promise<PaginatedResponse<T>> {
        const {page, limit, orderBy, orderOrientation, search, filters} = options || {};
        
        const skip = (page || 1) * (limit || 10) - (limit || 10);
        const sort = orderBy ? {[orderBy]: orderOrientation || 'asc'} : this.orders;
        
        let filterQuery: FilterQuery<T> = {};
        
        if (search) {
            const searchQuery: FilterQuery<T> = {};
            
            this.searchables.forEach((field) => {
                (searchQuery as any)[field] = new RegExp(search, 'i');
            });
            
            filterQuery = {...filterQuery, ...searchQuery};
        }
        
        if (filters) {
            filterQuery = {...filterQuery, ...filters};
        }
        
        const [docs, total] = await Promise.all([
            this.model.find(filterQuery).sort(sort).skip(skip).limit(limit || 10).exec(),
            this.model.countDocuments(filterQuery).exec(),
        ]);
        
        return {
            page,
            limit,
            hasNextPage: total > (page || 1) * (limit || 10),
            hasPrevPage: !!(page && page > 1),
            nextPage: total > (page || 1) * (limit || 10) ? (page || 1) + 1 : undefined,
            prevPage: page && page > 1 ? (page || 1) - 1 : undefined,
            total,
            docs,
        }
    }
    
    async findOne(query: FilterQuery<T>, select?: string): Promise<T | null> {
        if (select) {
            return this.model.findOne(query).select(select);
        }
        return this.model.findOne(query).exec();
    }
    
    async findById(id: string, query?: FilterQuery<T>, select?: string): Promise<T | null> {
        if (select) {
            return this.model.findById({
                _id: id,
                ...query || {},
            }).select(select);
        }
        return this.model.findById({_id: id});
    }
    
    async create(data: Partial<T>): Promise<T> {
        return await this.model.create(data);
    }
    
    async update(query: FilterQuery<T>, data: Partial<T>): Promise<T | null> {
        return await this.model.findOneAndUpdate(query, data, {new: true}).exec();
    }
    
    async delete(query: FilterQuery<T>): Promise<T | null> {
        return await this.model.findOneAndDelete(query).exec();
    }
}


export {AbstractRepository}
