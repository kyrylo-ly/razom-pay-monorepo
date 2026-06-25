import type {
	TelegramCompleteRequest,
	TelegramCompleteResponse
} from '@razom-pay/contracts/gen/auth'
import type { Telegraf } from 'telegraf'

import { authClient } from '@/infra/grpc/auth.client'
import type { TelegrafContext } from '@/shared/interfaces'
import { callUnary } from '@/shared/utils'

export function registerContactHandler(bot: Telegraf<TelegrafContext>) {
	bot.on('contact', async ctx => {
		const phone = ctx.message.contact.phone_number

		if (!ctx.chat.id || !ctx.session.id)
			return ctx.reply(
				'Відбулась помилка. Будь ласка, почніть процес через сайт.'
			)

		const request: TelegramCompleteRequest = {
			sessionId: ctx.session.id,
			phone
		}

		const { sessionId } = await callUnary<TelegramCompleteResponse>(
			authClient.telegramComplete.bind(authClient),
			request
		)

		await ctx.reply(
			'Реєстрація успішна! Ви можете повернутися на сайт та продовжити роботу з вашим акаунтом.',
			{
				reply_markup: {
					inline_keyboard: [
						[
							{
								text: 'Повернутися на сайт',
								url: `${process.env.NEXT_PUBLIC_URL}/auth/tg-finalize?sessionId=${sessionId}`
							}
						]
					],
					remove_keyboard: true
				}
			}
		)
	})
}
