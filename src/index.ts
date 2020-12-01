import * as express from 'express'
import * as jdenticon from 'jdenticon'
import logger from './logger'

export interface MyRequest extends express.Request {
    locals: any
}

const app = express()

app.use((req: MyRequest, res, next) => {
    if (!req.query.data) {
        res.status(401).send('Missing query parameter "data"')
        return
    }

    req.locals = {
        data: decodeURIComponent(<string>req.query.data),
        size: Number(req.query.size ?? 200),
    }

    next()
})

app.use('/png', (req: MyRequest, res) => {
    const buffer = jdenticon.toPng(req.locals.data, req.locals.size)
    res.contentType('image/png')
    res.send(buffer)
})

app.use('/svg', (req: MyRequest, res) => {
    const buffer = jdenticon.toSvg(req.locals.data, req.locals.size)
    res.contentType('image/svg+xml')
    res.send(buffer)
})

app.use('/', (req, res) => res.send('Jdenticon Generator'))

// Starting server
const port = process.env.PORT ?? 80
app.listen(port, () => logger.info('🖼  Jdenticon Generator'))
