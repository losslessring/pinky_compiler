export class Token {
    constructor(tokenType, lexeme, line) {
        this.tokenType = tokenType
        this.lexeme = lexeme
        this.line = line
    }

    toString() {
        return `${this.tokenType}, ${this.lexeme}, ${this.line}`
    }
}
