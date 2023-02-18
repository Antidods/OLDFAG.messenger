export async function step(_name: string, callback: () => void) {
	await callback();
}
