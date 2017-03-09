all: manifest.json background.js medium_fixer.js
	apack un-mediumify.zip *.js *.json unmediumify_*.png

manifest.json: manifest.yaml
	remarshal -if yaml -of json --indent-json $< > $@

