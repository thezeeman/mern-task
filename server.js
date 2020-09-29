const express = require('express');
const promMid = require('express-prometheus-middleware');
const app = express();

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    
})

app.get('/time', (req, res) => {
    if (req.headers.mysecrettoken.length) {
        return res.send(
            {
                properties: {
                    epoch: {
                        description: Date.now(),
                        type: 'number',
                    }
                },
                required: ['epoch'],
                'type': 'object'
            }
        )
    }
    res.status(403).send({ success: false })
})

app.get('/metrics', (req, res, next) => {
    if (req.headers.mysecrettoken.length) {
        return next()
    }
    res.status(403).send({ success: false })
})

app.use(promMid({
    metricsPath: '/metrics',
    collectDefaultMetrics: true,
    requestDurationBuckets: [0.1, 0.5, 1, 1.5]
}))