CURL=curl
GREP=grep

README_TMP=README.md
# change those for your project
USER=DBM-Extended
REPO=mods

.PHONY: purge

purge:
    $(CURL) -s https://github.com/$(USER)/$(REPO)/blob/master/README.md > $(README_TMP)
    $(GREP) -Eo '<img src="[^"]+"' $(README_TMP) | $(GREP) camo | $(GREP) -Eo 'https[^"]+' | xargs -I {} $(CURL) -w "\n" -s -X PURGE {}
