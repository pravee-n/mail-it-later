$(document).ready(function() {
	$('.js-auth-begin').click(function() {
		var postData = {
			"consumer_key": "34005-0ea14e2fba4a32437e9d6739",
			"redirect_uri": "http://localhost:3000/auth"
		};

		// $.ajax({
		// 	url: 'https://getpocket.com/v3/oauth/request',
		// 	type: 'POST',
		// 	data: postData,
		// 	// headers: {
		//  //        // "Content-Type":"application/json;charset=UTF-8",
		//  //        // "X-Accept":"application/json"
		// 	// },
		// 	// data: {'consumer_key': '34005-0ea14e2fba4a32437e9d6739', 'redirect_uri': 'http://localhost:3000/auth'},
		// 	// datatype: 'jsonp',
		// 	// data: JSON.stringify(postData),
		// 	// contentType: "application/json; charset=utf-8",
		// 	success: function(response) {
		// 		console.log(response);
		// 	}
		// });

		$.post("https://getpocket.com/v3/oauth/request", {
		    "consumer_key": "34005-0ea14e2fba4a32437e9d6739",
			"redirect_uri": "http://localhost:3000/auth"
		}, function(response) {
			console.log(response)
		    // alert("Data: " + data + "\nStatus: " + status);
		});

	});
});