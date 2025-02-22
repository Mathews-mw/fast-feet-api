interface Coordinates {
	latitude: number;
	longitude: number;
}

interface Props {
	from: Coordinates;
	to: Coordinates;
}

export function getDistanceBetweenCoordinates({ from, to }: Props) {
	if (from.latitude === to.latitude && from.longitude === to.longitude) {
		return 0;
	}

	const fromRadian = (Math.PI * from.latitude) / 180;
	const toRadian = (Math.PI * to.latitude) / 180;

	const theta = from.longitude - to.longitude;
	const radTheta = (Math.PI * theta) / 180;

	let dist = Math.sin(fromRadian) * Math.sin(toRadian) + Math.cos(fromRadian) * Math.cos(toRadian) * Math.cos(radTheta);

	if (dist > 1) {
		dist = 1;
	}

	dist = Math.acos(dist);
	dist = (dist * 180) / Math.PI;
	dist = dist * 60 * 1.1515;
	dist = dist * 1.609344; // O valor 1.609344 especifica que o resultado final do cálculo será uma distância em KM

	return dist;
}

export function haversineDistance(coord1: { lat: number; lng: number }, coord2: { lat: number; lng: number }) {
	const R = 6371e3; // Raio da Terra em metros
	const φ1 = (coord1.lat * Math.PI) / 180;
	const φ2 = (coord2.lat * Math.PI) / 180;
	const Δφ = ((coord2.lat - coord1.lat) * Math.PI) / 180;
	const Δλ = ((coord2.lng - coord1.lng) * Math.PI) / 180;

	const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

	return R * c; // Retorna a distância em metros
}
