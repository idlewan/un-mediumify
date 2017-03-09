all: manifest.json background.js medium_fixer.js un-mediumify_48.png un-mediumify_96.png
	apack un-mediumify.zip $^

manifest.json: manifest.yaml
	remarshal -if yaml -of json --indent-json $< > $@

un-mediumify_96.png: un-mediumify.png
	convert $< -resize 96x96 $@

un-mediumify_48.png: un-mediumify.png
	convert $< -resize 48x48 $@
