import Main from './Main.svelte';
import NT from 'svelte-web-components/util/NT'

function setNTfromURL(){
	const urlParams = new URLSearchParams(window.location.search);
    const hasTeam = urlParams.has('team');
	const hasIP = urlParams.has('ip');
	console.log("Reading url params")
	let ip = "127.0.0.1"
	if (hasIP) {
		ip = urlParams.get('ip')

	}
	else if (hasTeam) {
		const team = urlParams.get('team');
		if (team.match("^\\d{1,5}$")) {
			const num = Number.parseInt(team);
			const firstChunk = Math.floor(num / 100);
			const secondChunk = num % 100;
			ip = `10.${firstChunk}.${secondChunk}.2`;
		}
		else {
			console.error(`Team number ${team} not valid! Defaulting to locally hosted NT!`)
		}
	}
	console.log("Setting IP to ", ip)
	NT.setIP(ip);
}

setNTfromURL();

const app = new Main({
	target: document.body
});

export default app;