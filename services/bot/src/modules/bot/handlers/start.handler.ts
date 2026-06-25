import { Markup, Telegraf } from 'telegraf'

import type { TelegrafContext } from '@/shared/interfaces'

export function registerStartHandler(bot: Telegraf<TelegrafContext>) {
	bot.start(async ctx => {
		const sessionId = ctx.startPayload

		if (!sessionId) {
			return ctx.reply(
				'Вітаю! Щоб почати, будь ласка, зареєструйтеся на сайті та натисніть кнопку "Почати" знову.',
				Markup.inlineKeyboard([
					Markup.button.url(
						'Зареєструватися',
						`${process.env.NEXT_PUBLIC_URL}/auth/login`
					)
				])
			)
		}

		ctx.session.id = sessionId

		await ctx.reply(
			'Для завершення реєстрації, будь ласка, відправте свій номер телефону.',
			Markup.keyboard([
				[Markup.button.contactRequest('Поділитися номером телефону')]
			])
		)
	})
}
