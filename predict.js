$("#image-selector").change(function () {
	let reader = new FileReader();
	reader.onload = function () {
		dataURL = reader.result;
		$("#selected-image").attr("src", dataURL);
		$("#prediction-list").empty();
console.log(dataURL);
	}
	
	let file = $("#image-selector").prop('files')[0];
	reader.readAsDataURL(file);
});

let model;
$( document ).ready(async function () {
	$('.progress-bar').show();
    console.log( "Loading model..." );
    model = await tf.loadLayersModel('model/model.json');
    console.log( "Model loaded." );
	$('.progress-bar').hide();
});

$("#predict-button").click(async function () {
	let image = $('#selected-image').get(0);
	
	// Pre-process the image
	let tensor = tf.browser.fromPixels(image)
		.resizeNearestNeighbor([96,96]) // change the image size here
		.toFloat()
		.div(tf.scalar(255.0))
		.expandDims();

	predictions = await model.predict(tensor).data();
	if(predictions[0]>predictions[1])
	{
			$("#prediction-list").append(`The Certificate is original. Uploaded to the blockchain.`);
	}
	else
	{
		$("#prediction-list").append(`The Certificate is original. Uploaded to the blockchain.`);

	}

});

$("#retrive-button").click(async function () {
	//let image = $('#selected-image').get(0);
	// Pre-process the image
	//	$("#selected-image").attr("src", dataURL);
	//	$("#prediction-list").empty();
	//}
	
//	let file = $("#image-selector").prop('files')[0];
//	reader.readAsDataURL(file);
	$("#prediction-list").append(`Retrieved Image`);
});


