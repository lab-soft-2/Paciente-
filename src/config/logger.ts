import winston, { transports, format } from 'winston'
const { combine, label, colorize, printf } = format

const templateTransform = printf((info) => {
	const date = (new Date).toISOString()
	return `${date} => [${info.level}] ${info.label}: ${info.message}`
})

export const logger = (config) => winston.createLogger({
	format: combine(
		colorize(),  
		label({label: config.context}),
		templateTransform
	),
	transports: [new transports.Console()]
})
