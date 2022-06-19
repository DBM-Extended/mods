GAIMAN=./bin/compile.js
ROLLUP=./node_modules/.bin/rollup
CAT=cat
CURL=curl
GREP=grep
GIT=git
CD=cd
RM=rm
NPM=npm
URL=`git config --get remote.origin.url`

README_TMP=README.md
USER=DBM-Extended
REPO=mods



.PHONY: test coveralls demo

purge:
	$(CURL) -s https://github.com/$(USER)/$(REPO)/blob/master/README.md > $(README_TMP)
	$(GREP) -Eo '<img src="[^"]+"' $(README_TMP) | $(GREP) camo | $(GREP) -Eo 'https[^"]+' | xargs -I {} $(CURL) -w "\n" -s -X PURGE {}
