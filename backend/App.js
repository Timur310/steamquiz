import Fastify from 'fastify'
import appIds from "../apps.json" with {type: "json"};
const path = require('node:path')

const app = Fastify({ logger: true })

app.register(require('@fastify/static'), {
	root: path.join(__dirname, 'public'),
	prefix: '/public/', // optional: default '/'
})

const cyrb53 = (str, seed = 0) => {
	let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
	for (let i = 0, ch; i < str.length; i++) {
		ch = str.charCodeAt(i);
		h1 = Math.imul(h1 ^ ch, 2654435761);
		h2 = Math.imul(h2 ^ ch, 1597334677);
	}
	h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
	h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
	h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
	h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);

	return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

app.get('/', function (request, reply) {
	reply.sendFile('index.html')
})

// for the basic single game 3 review
app.get('/api/review', async function handler(request, reply) {
	const gamesObject = []
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
			title: gameResponse[id].data.name,
			img_url: gameResponse[id].data.capsule_image,
			review: finalReview.review
		})

	}
	const response = {
		"target": cyrb53(gamesObject[(Math.floor(Math.random() * gamesObject.length))].img_url.split("/")[6]),
		"reviews": gamesObject
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