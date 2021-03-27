export async function translate(){
	let respose = await fetch(document.location+'/js/lang.json');
	let data = await respose.json();
	return data;
}