import { app } from './routes/main.js'

export const startServer = (port) => {
    app.listen(port, () =>
        console.log(`Pinky language server is listening on port ${port}!`)
    )
}
