import 'dotenv/config'
export const env = {
	appName: 'patient-service',
	serverPort: 3000,
	database: process.env.DATABASE_URL
}
