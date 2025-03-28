import { expression } from './expression'
import { TOKENS } from './../lexer/tokens'
import { matchTokenType } from './utils/matchTokenType'
import { expectToken } from './utils/expectToken'
import { LocalAssignment } from './classes/statement/LocalAssignment'

export function localAssignment(current, tokens) {
    if (!tokens[current]) {
        throw new Error(
            'Tried to access an unexisting token in local assignment'
        )
    }

    const localToken = tokens[current]

    expectToken(localToken.tokenType, TOKENS.TOK_LOCAL, localToken.line)

    const leftResult = expression(current + 1, tokens)

    const leftExitCursor = leftResult.current

    const assignmentToken = tokens[leftExitCursor]

    if (
        assignmentToken !== undefined &&
        matchTokenType(assignmentToken.tokenType, TOKENS.TOK_ASSIGN)
    ) {
        const rightResult = expression(leftExitCursor + 1, tokens)

        const rightExitCursor = rightResult.current

        return {
            node: new LocalAssignment(
                leftResult.node,
                rightResult.node,
                localToken.line
            ),
            current: rightExitCursor,
            tokens,
        }
    }
}
