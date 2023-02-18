import { setupServer } from 'msw/node';
import { rest } from 'msw';

const handlers = [
	rest.get(`${process.env.API_ENDPOINT}/test`, (_req, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.json({
				status: 200,
				message: 'test message',
			})
		);
	}),

	rest.post(`${process.env.API_ENDPOINT}/test`, (_req, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.json({
				status: 200,
				message: 'test message',
			})
		);
	}),

	rest.put(`${process.env.API_ENDPOINT}/test`, (_req, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.json({
				status: 200,
				message: 'test message',
			})
		);
	}),

	rest.delete(`${process.env.API_ENDPOINT}/test`, (_req, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.json({
				status: 200,
				message: 'test message',
			})
		);
	}),

	rest.patch(`${process.env.API_ENDPOINT}/test`, (_req, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.json({
				status: 200,
				message: 'test message',
			})
		);
	}),
];

export const server = setupServer(...handlers);
