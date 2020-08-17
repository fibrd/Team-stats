import { slice, take } from 'lodash-es'

export function paginate(items, pageSelected, perPage) {
	const startIndex = (pageSelected - 1) * perPage
	return take(slice(items, startIndex), perPage)
}
