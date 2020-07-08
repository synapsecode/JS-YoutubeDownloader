convertBtn = document.getElementById("convert");
vidLink = document.getElementById("vidlink");

let serverURL = 'http://localhost:4000';

convertBtn.onclick = () => {
	downloadType = document.querySelector('input[name=downloadType]:checked');
	quality = document.getElementById("dqual").value;
	if(!downloadType){
		alert("Please choose a download format!");
		return;
	}
	if(quality == ""){
		alert("Please choose the download quality");
		return;
	}
	if(!vidLink.value){
		alert("Enter the Youtube URL");
	}else{
		if (downloadType.value == 'mp3') {
			redirectMp3(vidLink.value, quality);
		} else if (downloadType.value == 'mp4') {
			redirectMp4(vidLink.value, quality);
		}
	}
};

function redirectMp3(link, quality) {
	window.location.href = `${serverURL}/downloadmp3?url=${link}?qual=${quality}`;
}

function redirectMp4(link, quality) {
	window.location.href = `${serverURL}/downloadmp4?url=${link}?qual=${quality}`;
}