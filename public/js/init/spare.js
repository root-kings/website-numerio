var spareview

document.addEventListener('DOMContentLoaded', function() {
	populate(localStorage.getItem('spareId'))
})

function populate(id) {
	fetch(hostaddress + '/api/spare/' + id)
		.then(function(response) {
			return response.json()
		})
		.then(function(spare) {
			spareview = new Vue({
				el: '#spare',
				data: {
					spare: spare
				},
				mounted: function() {
					M.updateTextFields()
				}
			})
		})
}

function updateSpare(id) {
	var createform = document.getElementById('createspareform')
	var formData = new FormData(createform)

	var formobject = {}
	formData.forEach(function(value, key) {
		formobject[key] = value
	})

	fetch(hostaddress + '/api/spare/' + id + '/edit', {
		method: 'POST', // *GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, cors, *same-origin
		headers: {
			'Content-Type': 'application/json'
			// "Content-Type": "application/x-www-form-urlencoded",
		},
		body: JSON.stringify(formobject) // body data type must match "Content-Type" header
	})
		.then(function(response) {
			return response.json()
		})
		.then(function(result) {
			if (result) {
				M.toast({ html: 'Spare updated!' })
			}
		})
}
