// Script.js 
// Adding event listener to the form element 
document 
	.getElementById("feedbackForm") 
	.addEventListener( 
		"submit", 
		function (event) { 
			// PreventDefault() is used to avoid 
			// Refreshing of browser while submit 
			event.preventDefault(); 

			let nameField = 
				document.getElementById( 
					"name"
				);			
			let errorText = 
				document.getElementById( 
					"errorText"
				); 

			let name = nameField.value; 
			

			// Creating a regular expression for 
			// Name field 
			let Regex = /^[A-Za-z ]+$/; 

			// If name does not matches the 
			// Regular expression 
			if (!name.match(Regex)) { 
				nameField.classList.add( 
					"error"
				); 
				errorText.innerHTML = 
					`Name field should only contain 
					English alphabets and spaces`; 
				errorText.classList.add( 
					"errorText"
				); 
				return; 
			} 		

			// Removing red border in name field 
			if ( 
				nameField.classList.contains( 
					"error"
				) 
			) 
				nameField.classList.remove( 
					"error"
				); 		

			// Adding success message and styles 
			errorText.innerHTML = 
				"Submitted Successfully"; 
			errorText.classList.add( 
				"successText"
			); 

			const formData = 
				new FormData( 
					event.target 
				); 
			const formValues = {}; 

			// Storing each values in the object 
			formData.forEach( 
				(value, key) => { 
					formValues[key] = 
						value; 
				} 
			); 

			// Calling convert function 
			const csvContent = 
				convertToCSV( 
					formValues 
				); 
			const blob = new Blob( 
				[csvContent], 
				{ type: "text/csv" } 
			); 

			// Creating a link for downloading 
			// Excel sheet 
			const link = 
				document.createElement( 
					"a"
				); 
			link.href = 
				window.URL.createObjectURL( 
					blob 
				); 
			link.download = 
				"feedback_data.csv"; 
			link.click(); 

			// Reseting the form after certain 
			// Timeout 2000ms => 2s 
			setTimeout( 
				document 
					.getElementById( 
						"feedbackForm"
					) 
					.reset(), 
				2000 
			); 
		} 
	); 

// Function to convert object to csv 
function convertToCSV(objArr) { 
	const array = 
		typeof objArr !== "object"
			? JSON.parse(objArr) 
			: objArr; 
	let result = ""; 

	// Add commas to make it as csv 
	const header = 
		Object.keys(array).join(",") + 
		"\n"; 
	result += header; 

	for (const item in array) { 
		if ( 
			array.hasOwnProperty(item) 
		) { 
			result += array[item] + ","; 
		} 
	} 
	result = result.slice(0, -1); 
	result += "\n"; 

	return result; 
}
