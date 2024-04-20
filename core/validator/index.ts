class Validator {
    
    private readonly errors: any = undefined;
    
    private readonly data: any = undefined;
    
    private readonly isValid: boolean = false;
    
    private constructor(data: any, schema: any) {
        // validate data with zoa schema
        const result = schema.safeParse(data);
        if (!result.success) {
            this.errors = this.parseErrors(result.error.issues);
        }
        this.data = data;
        this.isValid = result.success;
    }
    
    static validate(data: any, schema: any) {
        return new Validator(data, schema);
    }
    
    get isValidated() {
        return this.isValid;
    }
    
    get violations() {
        return this.errors;
    }
    
    get validated() {
        return this.data;
    }
    
    private parseErrors(errors: any) {
        return errors.map((error: any) => {
            return {
                [error.path[0]]: error.message
            };
        });
    }
}


export {
    Validator
}
