import { createEvent, createStore, sample } from "effector";

const $inViewNumber = createStore(0);

const incrementViewNumber = createEvent();

sample({
	clock: incrementViewNumber,
	source: $inViewNumber,
	fn: (inViewNumber) => inViewNumber + 1,
	target: $inViewNumber
})


export const model = {
	$inViewNumber,
	incrementViewNumber
}
