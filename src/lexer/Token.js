export class Token {
    constructor(tokenType, lexeme) {
        this.tokenType = tokenType
        this.lexeme = lexeme
    }

    toString() {
        return `${this.tokenType}, ${this.lexeme}`
    }
}
