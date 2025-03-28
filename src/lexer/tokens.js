export const TOKENS = {
    //Single-char tokens
    TOK_LPAREN: 'TOK_LPAREN',
    TOK_RPAREN: 'TOK_RPAREN',
    TOK_LCURLY: 'TOK_LCURLY',
    TOK_RCURLY: 'TOK_RCURLY',
    TOK_LSQUAR: 'TOK_LSQUAR',
    TOK_RSQUAR: 'TOK_RSQUAR',
    TOK_COMMA: 'TOK_COMMA',
    TOK_DOT: 'TOK_DOT',
    TOK_PLUS: 'TOK_PLUS',
    TOK_MINUS: 'TOK_MINUS',
    TOK_STAR: 'TOK_STAR',
    TOK_SLASH: 'TOK_SLASH',
    TOK_CARET: 'TOK_CARET',
    TOK_MOD: 'TOK_MOD',
    TOK_COLON: 'TOK_COLON', // :
    TOK_SEMICOLON: 'TOK_SEMICOLON',
    TOK_QUESTION: 'TOK_QUESTION',
    TOK_NOT: 'TOK_NOT', // ~
    TOK_GT: 'TOK_GT',
    TOK_LT: 'TOK_LT',
    TOK_EQ: 'TOK_EQ', // =
    // Two-char tokens
    TOK_EQEQ: 'TOK_EQEQ', // ==
    TOK_GE: 'TOK_GE',
    TOK_LE: 'TOK_LE',
    TOK_NE: 'TOK_NE', // ~=
    TOK_ASSIGN: 'TOK_ASSIGN', // :=
    TOK_GTGT: 'TOK_GTGT',
    TOK_LTLT: 'TOK_LTLT',
    // Literals
    TOK_IDENTIFIER: 'TOK_IDENTIFIER',
    TOK_STRING: 'TOK_STRING',
    TOK_INTEGER: 'TOK_INTEGER',
    TOK_FLOAT: 'TOK_FLOAT',
    // Keywords
    TOK_IF: 'TOK_IF',
    TOK_THEN: 'TOK_THEN',
    TOK_ELSE: 'TOK_ELSE',
    TOK_TRUE: 'TOK_TRUE',
    TOK_FALSE: 'TOK_FALSE',
    TOK_AND: 'TOK_AND',
    TOK_OR: 'TOK_OR',
    TOK_LOCAL: 'TOK_LOCAL',
    TOK_WHILE: 'TOK_WHILE',
    TOK_DO: 'TOK_DO',
    TOK_FOR: 'TOK_FOR',
    TOK_FUNC: 'TOK_FUNC',
    TOK_NULL: 'TOK_NULL',
    TOK_END: 'TOK_END',
    TOK_PRINT: 'TOK_PRINT',
    TOK_PRINTLN: 'TOK_PRINTLN',
    TOK_RET: 'TOK_RET',
}

export const KEYWORDS = {
    if: TOKENS.TOK_IF,
    else: TOKENS.TOK_ELSE,
    then: TOKENS.TOK_THEN,
    true: TOKENS.TOK_TRUE,
    false: TOKENS.TOK_FALSE,
    and: TOKENS.TOK_AND,
    or: TOKENS.TOK_OR,
    local: TOKENS.TOK_LOCAL,
    while: TOKENS.TOK_WHILE,
    do: TOKENS.TOK_DO,
    for: TOKENS.TOK_FOR,
    func: TOKENS.TOK_FUNC,
    null: TOKENS.TOK_NULL,
    end: TOKENS.TOK_END,
    print: TOKENS.TOK_PRINT,
    println: TOKENS.TOK_PRINTLN,
    ret: TOKENS.TOK_RET,
}
