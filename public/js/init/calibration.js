var upcomingview

function createMachine() {
	showWait()
	var createform = document.getElementById('createmachineform')
	var formData = new FormData(createform)

	var formobject = {}
	formData.forEach(function(value, key) {
		formobject[key] = value
	})

	fetch(hostaddress + '/api/machine/create', {
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
				// updateView()
				// console.log(result)
				M.toast({ html: 'Machine added!' })
				updateView()
				createform.reset()
			}
			hideWait()
		})
	// console.log(JSON.stringify(formData))
	// console.log(formData.getAll())
}

function updateView() {
	showWait()
	fetch(hostaddress + '/api/machines')
		.then(function(response) {
			return response.json()
		})
		.then(function(listmachines) {
			listmachines.map(function(machine) {
				machine.soondays = moment(machine.checkup.next).diff(moment(), 'days')
				machine.soon = machine.soondays <= 10 ? true : false
			})

			listmachines.sort(function(m1, m2) {
				if (m1.soondays > m2.soondays) return 1
				if (m1.soondays < m2.soondays) return -1
				return 0
			})

			upcomingview.machines = listmachines
			hideWait()
		})
}

document.addEventListener('DOMContentLoaded', function() {
	showWait()
	fetch(hostaddress + '/api/machines')
		.then(function(response) {
			return response.json()
		})
		.then(function(listmachines) {
			listmachines.map(function(machine) {
				machine.soondays = moment(machine.checkup.next).diff(moment(), 'days')
				machine.soon = machine.soondays <= 10 ? true : false
			})

			listmachines.sort(function(m1, m2) {
				if (m1.soondays > m2.soondays) return 1
				if (m1.soondays < m2.soondays) return -1
				return 0
			})

			upcomingview = new Vue({
				el: '#upcoming',
				data: {
					machines: listmachines
				},

				mounted: function() {
					M.Collapsible.init(document.querySelectorAll('.collapsible'), {
						accordion: false
					})
					M.FormSelect.init(document.querySelectorAll('select'))
					M.Modal.init(document.querySelectorAll('.modal'))
					M.Datepicker.init(document.querySelectorAll('.datepicker'), {
						defaultDate: new Date(),
						setDefaultDate: true,
						format: 'yyyy-mm-dd'
					})
					M.updateTextFields()
					hideWait()
				}
			})
		})
})

function machineEdit(id) {
	localStorage.setItem('machineId', id)
	window.location.href = location.hostname == '' ? 'file:///android_asset/www/machine.html' : '/machine'
}

function addRecord(id) {
	showWait()
	var record = {
		id: id,
		date: document.getElementById('date' + id).value
		//remark: $("#remark" + id).val()
	}

	// console.log(record);

	fetch(hostaddress + '/api/machine/record/add', {
		method: 'POST', // *GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, cors, *same-origin
		headers: {
			'Content-Type': 'application/json'
			// "Content-Type": "application/x-www-form-urlencoded",
		},
		body: JSON.stringify(record) // body data type must match "Content-Type" header
	})
		.then(function(response) {
			return response.json()
		})
		.then(function(result) {
			if (result) {
				M.toast({ html: 'Record added!' })
				updateView()
			}
			hideWait()
		})
	/* $.post('/api/machine/record/add', record, function (result) {
        if (result) {
            updateView();
        }
    }) */
}

function removeRecord(id, val) {
	showWait()
	var record = {
		id: id,
		date: val
	}

	// console.log(record);

	fetch(hostaddress + '/api/machine/record/remove', {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(record)
	})
		.then(function(response) {
			return response.json()
		})
		.then(function(result) {
			if (result) {
				M.toast({ html: 'Record deleted!' })
				updateView()
			}
			hideWait()
		})
	/* 
    $.post('/api/machine/record/remove', record, function (result) {
        if (result) {
            updateView();
        }
    }) */
}

function machineDelete(id) {
	
	if (confirm('Delete this machine?')) {
		showWait()
		fetch(hostaddress + '/api/machine/' + id + '/delete', {
			method: 'POST',
			mode: 'cors'
		})
			.then(function(response) {
				return response.json()
			})
			.then(function(result) {
				if (result) {
					M.toast({ html: 'Machine deleted!' })
					updateView()
				}
				hideWait()
			})

		/* $.post('/api/machine/' + id + '/delete', function (result) {
            updateView();
        }); */
	}
}
function saveRemark(event, id) {
	showWait()
	fetch(hostaddress + '/api/machine/' + id + '/remark', {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ remark: event.target.value })
	})
		.then(function(response) {
			return response.json()
		})
		.then(function(result) {
			if (result) {
				M.toast({ html: 'Remark updated!' })
			}
			hideWait()
		})
	/* 
    $.post('/api/machine/' + id + '/remark', {remark:event.target.value}, function (result) {
        // updateView();
        M.toast({html:'Remark updated!'});
    }); */
	//console.log(id,event.target.value);
}
