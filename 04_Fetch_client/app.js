import {log, _} from '../my-module/logger.js';



const textBtn = _('#text-btn');
textBtn.addEventListener('click', () => {
	fetchTextData();
});
const jsonBtn = _('#json-btn');
jsonBtn.addEventListener('click', () => {
	fetchjsonData();
});



const fetchTextData = async () => {
	let res = await fetch('../01_AJAX_server/Data/message.txt');
	if (res.status !== 200) return log(`Some went wrong ${res.status}`);
	let data = await res.text();
	_('#text-card').innerHTML = `<h4>${data}</h4>`;
};


const fetchjsonData = async () => {
	fetch()
};