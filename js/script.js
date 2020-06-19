function openLink(evt, linkName) {
	var i, x, tablinks;
	x = document.getElementsByClassName('myLink');
	for (i = 0; i < x.length; i++) {
		x[i].style.display = 'none';
	}
	tablinks = document.getElementsByClassName('tablink');
	for (i = 0; i < x.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(' w3-red', '');
	}
	document.getElementById(linkName).style.display = 'block';
	evt.currentTarget.className += ' w3-red';
}

// Click on the first tablink on load
document.getElementsByClassName('tablink')[0].click();

let bvnInput = document.querySelector('#bvn'),
	dob = document.querySelector('#dob'),
	btn = document.querySelector('#but'),
	result = document.querySelector('#result');

btn.addEventListener('click', () => {
	if (!(bvnInput.value && dob.value)) {
		return;
	} else {
		getDetails();
		// console.log('I just got clicked');
		setTimeout(() => {
			result.style.display = 'block';
		}, 3000);
	}
});

function getDetails() {
	let url = 'https://sandbox.wallets.africa/self/verifybvn';
	const proxyurl = 'https://cors-anywhere.herokuapp.com/';

	const data = {
		Bvn         : parseInt(bvnInput.value),
		SecretKey   : 'hfucj5jatq8h',
		DateOfBirth : dob.value
	};

	makeCall(proxyurl + url, data).then((response) => {
		displayData(response); // JSON data parsed by `response.json()` call
	});

	function displayData(response) {
		// let errors = document.getElementById('errors');
		// let success = document.getElementById('success');
		let FirstName = document.querySelector('#FirstName'),
			LastName = document.querySelector('#LastName'),
			Email = document.querySelector('#Email'),
			Bvn = document.querySelector('#Bvn');

		if ((response.ResponseCode = '400')) {
			FirstName.innerHTML = response.FirstName;
			LastName.innerHTML = response.LastName;
			Email.innerHTML = response.Email;
			Bvn.innerHTML = response.BVN;
			// errors.innerText = response.Message;
			console.log(response.Message);
			console.log(response.FirstName);
			console.log(response.LastName);
			console.log(response.Email);
			console.log(response.BVN);
		} else {
			// success.innerText = response.Message;
			console.log(response.Message);
		}
	}

	async function makeCall(url, data) {
		const response = await fetch(url, {
			method         : 'POST',
			cache          : 'no-cache',
			credentials    : 'same-origin', // Bearer uvjqzm5xl6bw
			headers        : {
				'Content-Type' : 'application/json',
				Authorization  : 'Bearer uvjqzm5xl6bw'
			},
			redirect       : 'follow', // manual, *follow, error
			referrerPolicy : 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
			body           : JSON.stringify(data) // body data type must match "Content-Type" header
		});

		return response.json();
	}
}
