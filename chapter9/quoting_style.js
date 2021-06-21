let text = "'I'm the cook,' he said, 'it's my job.'";
// Change this call.
console.log(text.replace(/(\s)'|'(\s)|^'|'$/g, '$1"$2'));
// → "I'm the cook," he said, "it's my job."

let text2 = "'I've seen everything' -Someone on the internet";
// Change this call.
console.log(text2.replace(/(\s)'|'(\s)|^'|'$/g, '$1"$2'));
// → "I've seen everything" -Someone on the internet"

let text3 =
	"'I've become death, the destroyer of worlds' -Robert 'Drama Queen' Oppenheimer";
// Change this call.
console.log(text3.replace(/(\s)'|'(\s)|^'|'$/g, '$1"$2'));
// → "I've become death, the destroyer of worlds" -Robert "Drama Queen" Oppenheimer"
