CURL=curl
GREP=grep

README_TMP=readme.html
# change those for your project
USER=DBM-Extended
REPO=mods

.PHONY: purge

purge:
	$(CURL) -s https://github.com/$(USER)/$(REPO)/blob/master/README.md > $(README_TMP)
	$(GREP) -Eo '<img src="[^"]+"' $(README_TMP) | $(GREP) camo | $(GREP) -Eo 'https[^"]+' | xargs -I {} $(CURL) -w "\n" -s -X PURGE {}
	$(CURL) -w "\n" -s -X PURGE https://camo.githubusercontent.com/d0febd4fca60d26eb1851a5ca0dcc59333c769efe76884b6551c5463c3fa62ce/68747470733a2f2f6261646765732e7075666c65722e6465762f636f6e7472696275746f72732f44424d2d457874656e6465642f6d6f64733f73697a653d35302670616464696e673d3526626f74733d74727565
