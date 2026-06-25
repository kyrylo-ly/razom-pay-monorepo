import { create } from 'node:domain'

import { createBot } from './modules/bot/bot.factory'

async function bootstrap() {
	try {
		console.log('Bootstrapping the Telegram bot...')
		const bot = createBot()
		bot.launch()

		console.log('Telegram bot is up and running!')
	} catch (error) {
		console.error('Error occurred while bootstrapping the bot:', error)
		process.exit(1)
	}
}

bootstrap()
