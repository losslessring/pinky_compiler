import { app } from './main.js'

export const startServer = (port) => {
    app.listen(port, () =>
        console.log(`Pinky language server is listening on port ${port}!`)
    )
}
