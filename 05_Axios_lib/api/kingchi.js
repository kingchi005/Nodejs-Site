export class AJAX {
	constructor () {
		this.http = new XMLHttpRequest();
	}


	get = (url, callback) => {
		this.http.open('GET',url,)
		this.http.send()
		this.http.onload = () => {
			if (this.http.status === 200) {
				let data = this.http.responseText;
				data = JSON.parse(data);
				callback(null, data)
				// return data;
				// console.log(JSON.parse(data));
			}else{
				callback(`Error: ${this.http.status}`)
			}
		}
	}


	post = (url, body, callback) => {
		this.http.open('POST', url, true);
		this.http.setRequestHeader('content-Type', 'application/json');
		this.http.send(JSON.stringify(body));
		this.http.onload = () => {
			let data = this.http.responseText;
			let res = JSON.parse(data);
			callback(res);
		}
	}


	put = (url, body, callback) => {
		this.http.open('PUT', url, true);
		this.http.setRequestHeader('content-Type', 'application/json');
		this.http.send(JSON.stringify(body));
		this.http.onload = () => {
			let data = this.http.responseText;
			let res = JSON.parse(data);
			callback(res);
		}
	}


	delete = (url, callback) => {
		this.http.open('DELETE', url, true);
		this.http.setRequestHeader('content-Type', 'application/json');
		this.http.send();
		this.http.onload = () => {
			let data = this.http.responseText;
			let res = JSON.parse(data);
			callback(res);
		}
	}
}