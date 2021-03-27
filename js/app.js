//import requierd modules
import { SpeechController } from './modules/speech.js';
import { translate } from './modules/translate.js';

// catch html elements
//original text area 
const TEXT_AREA = document.querySelector('#original-text');
const READ_BTN = document.querySelector('#read-btn');
const READ_BTN_ICON = READ_BTN.children[0];
const TRANS_BTN = document.querySelector('#translate-btn');
const TRANS_BTN_ICON = TRANS_BTN.children[0];
//translated text area
const TRANS_TEXT_AREA = document.querySelector('#translated-text');
const READ_TRANS_BTN = document.querySelector('#read-trans-btn');
const READ_TRANS_BTN_ICON = READ_TRANS_BTN.children[0];

//read original text
READ_BTN.addEventListener('click', () => {
	let text = TEXT_AREA.value;
	let speechController = new SpeechController(READ_BTN, READ_BTN_ICON);
	if (text) speechController.speak(text);
});

//read translated text
READ_TRANS_BTN.addEventListener('click', () => {
	let text = TRANS_TEXT_AREA.value;
	let speechController = new SpeechController(READ_TRANS_BTN, READ_TRANS_BTN_ICON);
	if (text) speechController.speak(text, 'spain');
});


//request a translation api
TRANS_BTN.addEventListener('click', function () {
	if (TEXT_AREA.value) {
		//on wiating
		//replace iconse
		TRANS_BTN_ICON.classList.replace('fa-glasses', 'fa-search');
		//desaible speak button
		TRANS_BTN.setAttribute('disabled', true);
		translate().then(response => {
			//on response
			TRANS_BTN_ICON.classList.replace('fa-search', 'fa-glasses');
			TRANS_BTN.removeAttribute('disabled');
			TRANS_TEXT_AREA.value = response.data.body;
		});
	}
});