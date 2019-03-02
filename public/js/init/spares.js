var spareview, stageEditView, stageEditViewModal

document.addEventListener('DOMContentLoaded', function() {
	showWait()
	fetch(hostaddress + '/api/spares')
		.then(function(response) {
			return response.json()
		})
		.then(function(listspares) {
			listspares.forEach(spare => {
				spare.requisition.date = moment(spare.requisition.date).format('YYYY-MM-DD')
				spare.vetting.date = moment(spare.vetting.date).format('YYYY-MM-DD')
				spare.tod.date = moment(spare.tod.date).format('YYYY-MM-DD')
				spare.tsc.date = moment(spare.tsc.date).format('YYYY-MM-DD')
				spare.so.date = moment(spare.so.date).format('YYYY-MM-DD')
			})

			spareview = new Vue({
				el: '#spares',
				data: {
					spares: listspares
				},
				mounted: function() {
					M.Collapsible.init(document.querySelectorAll('.collapsible'), {
						accordion: false
					})
					// M.Modal.init(document.querySelectorAll('.modal'))
					// M.Datepicker.init(
					// 	document.querySelectorAll('.datepicker'),
					// 	{
					// 		defaultDate: new Date(),
					// 		setDefaultDate: true,
					// 		format: 'yyyy-mm-dd'
					// 	}
					// )
					M.updateTextFields()
					hideWait()
				}
			})
		})
})

function spareEdit(id) {
	localStorage.setItem('spareId', id)
	window.location.href = location.hostname == '' ? 'file:///android_asset/www/spare.html' : '/spare'
}

function spareDelete(id) {
	if (confirm('Delete this spare?')) {
		showWait()
		fetch(hostaddress + '/api/spare/' + id + '/delete', {
			method: 'POST',
			mode: 'cors'
		})
			.then(function(response) {
				return response.json()
			})
			.then(function(result) {
				if (result) {
					M.toast({ html: 'Spare deleted!' })
					updateView()
				}
				hideWait()
			})
		/* $.post('/api/spare/' + id + '/delete', function (result) {
            window.location = '/spares';
        }); */
	}
}

function spareStageUpdate(id, stage) {
	showWait()
	fetch(hostaddress + '/api/spare/' + id + '/stage', {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ stage: stage })
	})
		.then(function(response) {
			return response.json()
		})
		.then(function(result) {
			if (result) {
				updateView()
				M.toast({ html: 'Updated!' })
			}
			hideWait()
		})
	/* $.post('/api/spare/' + id + '/stage',updateObject, function (result) {
	    window.location = '/spares';
	}); */
}

function spareEditTimerModal(id) {
	stageEditViewModal = M.Modal.init(document.getElementById('sparestagemodal' + id))

	stageEditViewModal.open()

	M.updateTextFields()
}

function spareEditTimer(id) {
	showWait()
	var newtimerform = new FormData(document.getElementById('sparestagemodalform' + id))
	var newtimerdata = {}
	newtimerform.forEach(function(value, key) {
		newtimerdata[key] = value
	})

	var newtimer = {
		requisition: {
			date: new Date(newtimerdata['requisition-date']),
			timeout: newtimerdata['requisition-timeout']
		},
		so: {
			date: new Date(newtimerdata['so-date']),
			timeout: newtimerdata['so-timeout']
		},
		tod: {
			date: new Date(newtimerdata['tod-date']),
			timeout: newtimerdata['tod-timeout']
		},
		tsc: {
			date: new Date(newtimerdata['tsc-date']),
			timeout: newtimerdata['tsc-timeout']
		},
		vetting: {
			date: new Date(newtimerdata['vetting-date']),
			timeout: newtimerdata['vetting-timeout']
		}
	}

	console.log(newtimer)

	fetch(hostaddress + '/api/spare/' + id + '/stage/timer', {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(newtimer)
	})
		.then(function(response) {
			return response.json()
		})
		.then(function(result) {
			if (result) {
				// updateView()
				M.toast({ html: 'Timer updated!' })
			}
			hideWait()
		})
}

function updateView() {
	showWait()
	fetch(hostaddress + '/api/spares')
		.then(function(response) {
			return response.json()
		})
		.then(function(listspares) {
			listspares.forEach(spare => {
				spare.requisition.date = moment(spare.requisition.date).format('YYYY-MM-DD')
				spare.vetting.date = moment(spare.vetting.date).format('YYYY-MM-DD')
				spare.tod.date = moment(spare.tod.date).format('YYYY-MM-DD')
				spare.tsc.date = moment(spare.tsc.date).format('YYYY-MM-DD')
				spare.so.date = moment(spare.so.date).format('YYYY-MM-DD')
			})

			spareview.spares = listspares
			hideWait()
		})
}

function createSpare() {
	showWait()
	var createform = document.getElementById('createspareform')
	var formData = new FormData(createform)

	var formobject = {}
	formData.forEach(function(value, key) {
		formobject[key] = value
	})

	fetch(hostaddress + '/api/spare/create', {
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
				M.toast({ html: 'Spare created!' })
				updateView()
				createform.reset()
			}
			hideWait()
		})
}
