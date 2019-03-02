var machineview

document.addEventListener('DOMContentLoaded', function() {
	populate(localStorage.getItem('machineId'))
})

function updateMachine(id) {
	var createform = document.getElementById('createmachineform')
	var formData = new FormData(createform)

	var formobject = {}
	formData.forEach(function(value, key) {
		formobject[key] = value
	})

	fetch(hostaddress + '/api/machine/'+id+'/edit', {
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
				M.toast({ html: 'Machine updated!' })
			}
		})
	
}

function populate(id) {
	fetch(hostaddress + '/api/machine/' + id)
		.then(function(response) {
			return response.json()
		})
		.then(function(machine) {
			// machine.checkup.history.sort().reverse();

			// machine.checkup.last = moment(this.checkup.history.sort()[0]).format("DD MMM YYYY");
			machine.caseoptions = ['open', 'lte', 'cp', 'gfr']

			machineview = new Vue({
				el: '#machine',

				data: {
					machine: machine
				},
				mounted: function() {
					// M.Datepicker.init(document.getElementById('date'), {
					//     defaultDate: new Date(),
					//     setDefaultDate: true,
					//     format: "yyyy-mm-dd"
					// });

					M.FormSelect.init(document.querySelectorAll('select'))

					M.updateTextFields()
				}
			})
		})
}
