export class Return extends Error {
    constructor(returnObject) {
        super(returnObject)
        this.returnObject = returnObject
    }
}
