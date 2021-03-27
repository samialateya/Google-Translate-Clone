export class SpeechController {
	// intiate speach variable
	constructor(microphoneBtn, microphoneBtnIcone) {
		//set default os text to speech
		this.synth = window.speechSynthesis;
		//catch microphone btn
		this.microphoneBtn = microphoneBtn;
		//catch microphone icone
		this.microphoneBtnIcone = microphoneBtnIcone;
	}

	speak(text,lang='en'){
		//change buttons status
		this.onSpeaking();
		// prepear speeking text
		let speakText = new SpeechSynthesisUtterance(text);

		//handle speaking proccess
		speakText.onend = e => {
			this.onEndSpeak();
		};
		// handle error
		speakText.onerror = e => {
			this.onError();
		};

		//set voice to spane if lang is spane
		if (lang == 'spain') {
			speakText.voice = this.changeVoice();
		}
		//process speaking
		this.synth.speak(speakText);
	}

	onSpeaking() {
		//replace iconse
		this.microphoneBtnIcone.classList.replace('fa-microphone', 'fa-microphone-alt');
		//desaible speak button
		this.microphoneBtn.setAttribute('disabled', true);
	}
	onEndSpeak() {
		//replace iconse
		this.microphoneBtnIcone.classList.replace('fa-microphone-alt', 'fa-microphone');
		//enable speak button
		this.microphoneBtn.removeAttribute('disabled');
	}
	onError() {
		console.log('error');
	}

	//select other voice
	changeVoice(){
		let voices = this.synth.getVoices();
		return voices[6];
	}
}