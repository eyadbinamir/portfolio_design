let landing = document.querySelector(".landing .container"),
	header = document.querySelector("header"),
	goDown = document.querySelector(".go-down i"),
	commentsArea = document.querySelector(".feedbacks .container"),
	//buttons
	artclesBtn = document.querySelector(".artcles-btn"),
	galleryBtn = document.querySelector(".gallery-btn"),
	featuresBtn = document.querySelector(".features-btn"),
	feedbacksBtn = document.querySelector(".feedbacks-btn"),
	teamMembersBtn = document.querySelector(".team-members-btn"),
	servicesBtn = document.querySelector(".services-btn"),
	ourSkillsBtn = document.querySelector(".our-skills-btn"),
	howItWorksBtn = document.querySelector(".how-it-works-btn"),
	eventsBtn = document.querySelector(".events-btn"),
	pricingBtn = document.querySelector(".pricing-btn"),
	discountBtn = document.querySelector(".discount-btn"),
	moreBtn = document.querySelector("button.more"),
	//to top button
	toTop = document.querySelector(".toTop"),
	//sections
	landings = document.querySelector(".landing"),
	artcles = document.querySelector(".artcles"),
	gallery = document.querySelector(".gallery"),
	features = document.querySelector(".features"),
	feedbacks = document.querySelector(".feedbacks"),
	teamMembers = document.querySelector(".team-members"),
	services = document.querySelector(".services"),
	ourSkills = document.querySelector(".our-skills"),
	howItWorks = document.querySelector(".how-it-works"),
	events = document.querySelector(".events"),
	pricing = document.querySelector(".pricing"),
	discount = document.querySelector(".discount");

document.addEventListener("scroll", () => {
	if (window.scrollY >= 200) {
		goDown.style.opacity = "0";
	} else {
		goDown.style.display = "flex";

		goDown.style.opacity = "1";
	}
});
//scroll to top
toTop.addEventListener("click", () => {
	scrollTo({ top: 0 });
});

window.addEventListener("scroll", () => {
	if (window.scrollY >= 500 && window.scrollY <= 800) {
		toTop.style.bottom = `${(window.scrollY - 600) * 0.25}px`;
	} else if (window.scrollY <= 600) {
		toTop.style.bottom = `${(window.scrollY - 600) * 0.25}px`;
	} else if (window.scrollY >= 650) {
		toTop.style.bottom = `50px`;
	}
});
// transition among sections by buttons

goDown.addEventListener("click", () => {
	scrollTo({ top: artcles.offsetTop });
});
artclesBtn.addEventListener("click", () => {
	scrollTo({ top: artcles.offsetTop });
});

galleryBtn.addEventListener("click", () => {
	scrollTo({
		top: gallery.offsetTop,
	});
});
featuresBtn.addEventListener("click", () => {
	scrollTo({
		top: features.offsetTop,
	});
});
feedbacksBtn.addEventListener("click", () => {
	scrollTo({
		top: feedbacks.offsetTop,
	});
});
teamMembersBtn.addEventListener("click", () => {
	scrollTo({
		top: teamMembers.offsetTop,
	});
});
servicesBtn.addEventListener("click", () => {
	scrollTo({
		top: services.offsetTop,
	});
});
ourSkillsBtn.addEventListener("click", () => {
	scrollTo({
		top: ourSkills.offsetTop,
	});
});
howItWorksBtn.addEventListener("click", () => {
	scrollTo({
		top: howItWorks.offsetTop,
	});
});
eventsBtn.addEventListener("click", () => {
	scrollTo({
		top: events.offsetTop,
	});
});
pricingBtn.addEventListener("click", () => {
	scrollTo({
		top: pricing.offsetTop,
	});
});
discountBtn.addEventListener("click", () => {
	scrollTo({
		top: discount.offsetTop,
	});
});
let displayedComments = [];
let hiddenComments = [];
let totalComments = 0;
let requestedFiles = 0;
let files = ["data1.json", "data2.json"];

let lessBtn = document.createElement("button");
lessBtn.classList.add("less");
lessBtn.innerHTML = "Less";
moreBtn.onclick = () => {
	moreBtn.style.display = "none";
	if (requestedFiles < files.length && hiddenComments.length == 0) {
		let commentsFetch = new XMLHttpRequest();
		commentsFetch.open("GET", files[requestedFiles]);
		commentsFetch.send();
		loadingComments();
		commentsFetch.addEventListener("load", appendComments);
		moreBtn.style.display = "flex";
	} else {
		for (let i = 0; i < 4; i++) {
			displayedComments.push(hiddenComments.pop());
			commentsArea.appendChild(displayedComments[displayedComments.length - 1]);
		}
		if (totalComments == displayedComments.length) {
			moreBtn.style.display = "none";
		} else {
			moreBtn.style.display = "flex";
		}
	}
	feedbacks.appendChild(lessBtn);
};
document.addEventListener("click", (element) => {
	if (element.target.classList.contains("less")) {
		console.log("hi");
		moreBtn.style.display = "flex";
		for (let i = 0; i < 4; i++) {
			let comment = commentsArea.children[commentsArea.children.length - 1];
			hiddenComments.push(displayedComments.pop());
			comment.remove();
		}
		if (displayedComments.length == 0) {
			element.target.remove();
		} else {
			feedbacks.appendChild(lessBtn);
		}
	}
});
function appendComments() {
	if (this.readyState == 4 && this.status == 200) {
		requestedFiles++;
		let data = JSON.parse(this.responseText);
		for (var i = 1; i <= 4; i++) {
			//this loop to remove the loading
			document.querySelector(".box.loading").remove();
		}

		for (var i = 0; i < data.person.length; i++) {
			//this for loop creates HTML elements of the comments and then fills the text places
			//  from the fetched comments text
			let commentBox = document.createElement("div");
			commentBox.classList.add("box");
			let image = document.createElement("img");
			image.setAttribute("src", data.person[i].image);

			commentBox.appendChild(image);

			let name = document.createElement("h3");
			let nameText = document.createTextNode(data.person[i].name);
			name.appendChild(nameText);
			commentBox.appendChild(name);

			let job = document.createElement("span");
			let jobText = document.createTextNode(data.person[i].job);
			job.appendChild(jobText);
			commentBox.appendChild(job);

			let rate = document.createElement("div");
			rate.classList.add("rate");
			commentBox.appendChild(rate);

			for (let j = 0; j < 5; j++) {
				let star = document.createElement("i");
				star.classList.add("far", "fa-star");
				rate.appendChild(star);
			}
			for (let j = 0; j < data.person[i].rate; j++) {
				rate.children[j].classList.remove("far");
				rate.children[j].classList.add("filled", "fas");
			}
			let comment = document.createElement("p");
			let commentText = document.createTextNode(data.person[i].comment);
			comment.appendChild(commentText);
			commentBox.appendChild(comment);
			displayedComments.push(commentBox);
			commentsArea.appendChild(commentBox);
		}
	}
	if (requestedFiles == files.length) {
		moreBtn.style.display = "none";
		totalComments = displayedComments.length;
	}
}
function loadingComments() {
	for (var i = 1; i <= 4; i++) {
		//this for loop to create loading comments
		let loadingCommentBox = document.createElement("div");
		loadingCommentBox.classList.add("box", "loading");

		let loadingCommentImage = document.createElement("div");
		loadingCommentImage.classList.add("image", "loading");

		let loadingCommentH3 = document.createElement("h3");
		loadingCommentH3.classList.add("loading");

		let loadingCommentSpan = document.createElement("span");
		loadingCommentSpan.classList.add("loading");

		let loadingCommentDiv = document.createElement("div");
		loadingCommentDiv.classList.add("rate", "loading");

		let loadingCommentP = document.createElement("p");
		loadingCommentP.classList.add("loading");

		loadingCommentBox.appendChild(loadingCommentImage);
		loadingCommentBox.appendChild(loadingCommentH3);
		loadingCommentBox.appendChild(loadingCommentSpan);
		loadingCommentBox.appendChild(loadingCommentDiv);
		loadingCommentBox.appendChild(loadingCommentP);
		commentsArea.appendChild(loadingCommentBox);
	}
}
//fill effection on the skils progress chart
let skillList = document.querySelectorAll(".skill"),
	percentageList = document.querySelectorAll(".skill .percentage"),
	progressList = document.querySelectorAll(".skill .progress div");
addEventListener("scroll", () => {
	if (
		window.scrollY + 200 >= ourSkills.offsetTop &&
		window.scrollY < ourSkills.offsetTop + ourSkills.offsetHeight
	) {
		setTimeout(() => {
			for (let i = 0; i < percentageList.length; i++) {
				progressList[i].style.width = percentageList[i].innerHTML;
			}
		}, 200);
	}
});
let secondsPrvw = document.querySelector(".seconds .value"),
	minutesPrvw = document.querySelector(".minutes .value"),
	hoursPrvw = document.querySelector(".hours .value"),
	daysPrvw = document.querySelector(".days .value");
let days = 15,
	hours = 12,
	minutes = 45,
	seconds = 13;
secondsPrvw.innerHTML = seconds;
minutesPrvw.innerHTML = minutes;
hoursPrvw.innerHTML = hours;
daysPrvw.innerHTML = days;

function timer() {
	if (seconds > 0) {
		seconds--;
		secondsPrvw.innerHTML = seconds;
	} else if (hours > 0) {
		seconds = 59;
		secondsPrvw.innerHTML = seconds;
		if (minutes > 0) {
			minutes--;
			minutesPrvw.innerHTML = minutes;
		} else if (hours > 0 && days > 0) {
			minutes = 59;
			minutesPrvw.innerHTML = minutes;
			if (hours > 0) {
				hours--;
				hoursPrvw.innerHTML = hours;
			} else if (days > 0) {
				hours = 23;
				hoursPrvw.innerHTML = hours;
				days--;
				daysPrvw.innerHTML = days;
			} else {
				days = 0;
				daysPrvw.innerHTML = days;
			}
		}
	}
}

setInterval(timer, 1000);
//temporarily storage for inputs in the session
let inputList = document.querySelectorAll(".input");
inputList.forEach(function (input) {
	input.value = window.sessionStorage.getItem(input.name);
});
document.addEventListener("input", () => {
	inputList.forEach(function (input) {
		window.sessionStorage.setItem(input.name, input.value);
	});
});
