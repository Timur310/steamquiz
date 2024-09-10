import Fastify from 'fastify'
import { cyrb53 } from './Utils';
import appIds from "../apps.json" with {type: "json"};
const path = require('node:path')

const app = Fastify({ logger: true })

app.register(require('@fastify/static'), {
	root: path.join(__dirname, 'public'),
	prefix: '/public/', // optional: default '/'
})

app.get('/', function (request, reply) {
	reply.sendFile('index.html')
})

// for the basic single game 3 review
app.get('/api/review', async function handler(request, reply) {
	const gamesObject = []
	let targetGame
	while (gamesObject.length != 3) {
		id = appIds[(Math.floor(Math.random() * appIds.length))]
		const gameRequest = await fetch(`https://store.steampowered.com/api/appdetails?appids=${id}`)
		const gameResponse = await gameRequest.json()

		if (gameResponse[id].data === undefined) continue

		let queriedReviews = 50

		const reviewRequest = await fetch(`https://store.steampowered.com/appreviews/${id}?json=1&language=all&num_per_page=50&cursor=*`)
		const reviewResponse = await reviewRequest.json()

		if (reviewResponse.reviews === undefined || reviewResponse.query_summary.num_reviews <= 1) continue

		let finalReview = reviewResponse.reviews[(Math.floor(Math.random() * reviewResponse.query_summary.num_reviews))]

		while (Math.random() > .5 && (reviewResponse.query_summary.total_reviews - queriedReviews) >= 0) {
			const secondReviewRequest = await fetch(`https://store.steampowered.com/appreviews/${id}?json=1&language=all&num_per_page=50&cursor=${encodeURIComponent(reviewResponse.cursor)}`)
			const secondReviewResponse = await secondReviewRequest.json()
			finalReview = secondReviewResponse.reviews[(Math.floor(Math.random() * secondReviewResponse.query_summary.num_reviews))]
			queriedReviews += 50
		}

		gamesObject.push({
			appId: id,
			title: gameResponse[id].data.name,
			img_url: gameResponse[id].data.header_image,
			review: finalReview.review
		})

		targetGame = gamesObject[(Math.floor(Math.random() * gamesObject.length))]

	}
	const response = {
		"target": cyrb53(targetGame.appId),
		"reviews": gamesObject
	}
	return response
})

app.get('/api/requirement', async function handler(request, reply) {
	const gamesObject = []
	let targetGame
	while (gamesObject.length != 3) {
		id = appIds[(Math.floor(Math.random() * appIds.length))]
		const gameRequest = await fetch(`https://store.steampowered.com/api/appdetails?appids=${id}`)
		const gameResponse = await gameRequest.json()

		if (gameResponse[id].data === undefined || !gameResponse[id].data.pc_requirements || !gameResponse[id].data.pc_requirements.minimum) continue

		gamesObject.push({
			appId: id,
			title: gameResponse[id].data.name,
			img_url: gameResponse[id].data.header_image,
			requirement: gameResponse[id].data.pc_requirements.minimum
		})

		targetGame = gamesObject[(Math.floor(Math.random() * gamesObject.length))]

	}
	const response = {
		"target": cyrb53(targetGame.appId),
		"requirements": gamesObject
	}
	return response
})

const start = async () => {
	try {
		await app.listen({ port: 3000 })
	} catch (err) {
		app.log.error(err)
		process.exit(1)
	}
}
start()