module.exports = {
    name: "Generate Random Word(s)",
    section: "Other Stuff",

    subtitle(data) {
        return `Generate ${data.langWord} "${data.countWord}" Random Word(s)`;
    },

    variableStorage(data, varType) {
        const type = parseInt(data.storage);
        if (type !== varType) return;
        return [data.varName, "Text"];
    },

    fields: ["storage", "varName", "lengthWord", "countWord", "langWord", "dictionary", "optionalWord"],

    html(isEvent, data) {
        return `
  <div style="width: 99%; height: 85vh; overflow: scroll;">
<div>
    <details>
        <summary style="cursor: pointer">Generate Random Word(s) Mod Description</summary>
        [Version 1.2] [<a href="#" onclick="DBM.openLink('https://github.com/MinEjo-DBM')">GitHub</a>]<br>
        Generating random words from a dictionary of about 1 thousand words.
    </details>
</div>

  <div style="float: left; width: 50%; padding-top: 8px">
  Length:<br>
    <input id="lengthWord" placeholder='0' class="round" type="text">
  </div>
    <div style="margin-left: 5%; float: left; width: 25%; padding-top: 8px">
    Word Count:<br>
    <input id="countWord" placeholder='0' class="round" type="text">
  </div>
  <div style="float: right; width: 15%; padding-top: 8px">
  Lang:<br>
  <select id="langWord" class="round">
      <option selected value="0">EN</option>
      <option value="1">RU</option>
    </select>
  </div><br><br><br>
    <div style="float: left; width: 35%; padding-top: 8px">
  Dictionary:<br>
  <select id="dictionary" class="round">
      <option selected value="0">Standard</option>
      <option value="1">Own</option>
      <option value="2">Both</option>
    </select>
  </div>
    <div style="float: right; width: 60%; padding-top: 8px">
    Optional (Words with a space):<br>
    <input id="optionalWord" class="round" type="text" placeholder="Leave blank for none!">
  </div><br><br><br>
  <div style="float: left; width: 35%; padding-top: 8px">
    Store In:<br>
    <select id="storage" class="round">
      ${data.variables[1]}
    </select>
  </div>
  <div id="varNameContainer" style="float: right; width: 60%; padding-top: 8px">
    Variable Name:<br>
    <input id="varName" class="round" type="text">
  </div>
</div>`;
    },

    init() {
    },

    action(cache) {
        const data = cache.actions[cache.index];
        const lengthWord = this.evalMessage(data.lengthWord, cache);
        const countWord = this.evalMessage(data.countWord, cache);
        const optionalWord = this.evalMessage(data.optionalWord, cache);
        const dictionary = parseInt(data.dictionary, 10);
        const langWord = parseInt(data.langWord, 10);

        let word = "";
        let randomWords = "";

        switch (langWord) {
            case 0:
                randomWords = ["ability", "able", "aboard", "about", "above", "accept", "accident", "according",
                               "account", "accurate", "acres", "across", "act", "action", "active", "activity",
                               "actual",
                               "actually", "add", "addition", "additional", "adjective", "adult", "adventure", "advice",
                               "affect", "afraid", "after", "afternoon", "again", "against", "age", "ago", "agree",
                               "ahead", "aid", "air", "airplane", "alike", "alive", "all", "allow", "almost", "alone",
                               "along", "aloud", "alphabet", "already", "also", "although", "am", "among", "amount",
                               "ancient", "angle", "angry", "animal", "announced", "another", "answer", "ants", "any",
                               "anybody", "anyone", "anything", "anyway", "anywhere", "apart", "apartment",
                               "appearance",
                               "apple", "applied", "appropriate", "are", "area", "arm", "army", "around", "arrange",
                               "arrangement", "arrive", "arrow", "art", "article", "as", "aside", "ask", "asleep", "at",
                               "ate", "atmosphere", "atom", "atomic", "attached", "attack", "attempt", "attention",
                               "audience", "author", "automobile", "available", "average", "avoid", "aware", "away",
                               "baby", "back", "bad", "badly", "bag", "balance", "ball", "balloon", "band", "bank",
                               "bar",
                               "bare", "bark", "barn", "base", "baseball", "basic", "basis", "basket", "bat", "battle",
                               "be", "bean", "bear", "beat", "beautiful", "beauty", "became", "because", "become",
                               "becoming", "bee", "been", "before", "began", "beginning", "begun", "behavior", "behind",
                               "being", "believed", "bell", "belong", "below", "belt", "bend", "beneath", "bent",
                               "beside", "best", "bet", "better", "between", "beyond", "bicycle", "bigger", "biggest",
                               "bill", "birds", "birth", "birthday", "bit", "bite", "black", "blank", "blanket", "blew",
                               "blind", "block", "blood", "blow", "blue", "board", "boat", "body", "bone", "book",
                               "border", "born", "both", "bottle", "bottom", "bound", "bow", "bowl", "box", "boy",
                               "brain", "branch", "brass", "brave", "bread", "break", "breakfast", "breath", "breathe",
                               "breathing", "breeze", "brick", "bridge", "brief", "bright", "bring", "broad", "broke",
                               "broken", "brother", "brought", "brown", "brush", "buffalo", "build", "building",
                               "built",
                               "buried", "burn", "burst", "bus", "bush", "business", "busy", "but", "butter", "buy",
                               "by",
                               "cabin", "cage", "cake", "call", "calm", "came", "camera", "camp", "can", "canal",
                               "cannot", "cap", "capital", "captain", "captured", "car", "carbon", "card", "care",
                               "careful", "carefully", "carried", "carry", "case", "cast", "castle", "cat", "catch",
                               "cattle", "caught", "cause", "cave", "cell", "cent", "center", "central", "century",
                               "certain", "certainly", "chain", "chair", "chamber", "chance", "change", "changing",
                               "chapter", "character", "characteristic", "charge", "chart", "check", "cheese",
                               "chemical",
                               "chest", "chicken", "chief", "child", "children", "choice", "choose", "chose", "chosen",
                               "church", "circle", "circus", "citizen", "city", "class", "classroom", "claws", "clay",
                               "clean", "clear", "clearly", "climate", "climb", "clock", "close", "closely", "closer",
                               "cloth", "clothes", "clothing", "cloud", "club", "coach", "coal", "coast", "coat",
                               "coffee", "cold", "collect", "college", "colony", "color", "column", "combination",
                               "combine", "come", "comfortable", "coming", "command", "common", "community", "company",
                               "compare", "compass", "complete", "completely", "complex", "composed", "composition",
                               "compound", "concerned", "condition", "congress", "connected", "consider", "consist",
                               "consonant", "constantly", "construction", "contain", "continent", "continued",
                               "contrast",
                               "control", "conversation", "cook", "cookies", "cool", "copper", "copy", "corn", "corner",
                               "correct", "correctly", "cost", "cotton", "could", "count", "country", "couple",
                               "courage",
                               "course", "court", "cover", "cow", "cowboy", "crack", "cream", "create", "creature",
                               "crew", "crop", "cross", "crowd", "cry", "cup", "curious", "current", "curve", "customs",
                               "cut", "cutting", "daily", "damage", "dance", "danger", "dangerous", "dark", "darkness",
                               "date", "daughter", "dawn", "day", "dead", "deal", "dear", "death", "decide", "declared",
                               "deep", "deeply", "deer", "definition", "degree", "depend", "depth", "describe",
                               "desert",
                               "design", "desk", "detail", "determine", "develop", "development", "diagram", "diameter",
                               "did", "die", "differ", "difference", "different", "difficult", "difficulty", "dig",
                               "dinner", "direct", "direction", "directly", "dirt", "dirty", "disappear", "discover",
                               "discovery", "discuss", "discussion", "disease", "dish", "distance", "distant", "divide",
                               "division", "do", "doctor", "does", "dog", "doing", "doll", "dollar", "done", "donkey",
                               "door", "dot", "double", "doubt", "down", "dozen", "draw", "drawn", "dream", "dress",
                               "drew", "dried", "drink", "drive", "driven", "driver", "driving", "drop", "dropped",
                               "drove", "dry", "duck", "due", "dug", "dull", "during", "dust", "duty", "each", "eager",
                               "ear", "earlier", "early", "earn", "earth", "easier", "easily", "east", "easy", "eat",
                               "eaten", "edge", "education", "effect", "effort", "egg", "eight", "either", "electric",
                               "electricity", "element", "elephant", "eleven", "else", "empty", "end", "enemy",
                               "energy",
                               "engine", "engineer", "enjoy", "enough", "enter", "entire", "entirely", "environment",
                               "equal", "equally", "equator", "equipment", "escape", "especially", "essential",
                               "establish", "even", "evening", "event", "eventually", "ever", "every", "everybody",
                               "everyone", "everything", "everywhere", "evidence", "exact", "exactly", "examine",
                               "example", "excellent", "except", "exchange", "excited", "excitement", "exciting",
                               "exclaimed", "exercise", "exist", "expect", "experience", "experiment", "explain",
                               "explanation", "explore", "express", "expression", "extra", "eye", "face", "facing",
                               "fact", "factor", "factory", "failed", "fair", "fairly", "fall", "fallen", "familiar",
                               "family", "famous", "far", "farm", "farmer", "farther", "fast", "fastened", "faster",
                               "fat", "father", "favorite", "fear", "feathers", "feature", "fed", "feed", "feel",
                               "feet",
                               "fell", "fellow", "felt", "fence", "few", "fewer", "field", "fierce", "fifteen", "fifth",
                               "fifty", "fight", "fighting", "figure", "fill", "film", "final", "finally", "find",
                               "fine",
                               "finest", "finger", "finish", "fire", "fireplace", "firm", "first", "fish", "five",
                               "fix",
                               "flag", "flame", "flat", "flew", "flies", "flight", "floating", "floor", "flow",
                               "flower",
                               "fly", "fog", "folks", "follow", "food", "foot", "football", "for", "force", "foreign",
                               "forest", "forget", "forgot", "forgotten", "form", "former", "fort", "forth", "forty",
                               "forward", "fought", "found", "four", "fourth", "fox", "frame", "free", "freedom",
                               "frequently", "fresh", "friend", "friendly", "frighten", "frog", "from", "front",
                               "frozen",
                               "fruit", "fuel", "full", "fully", "fun", "function", "funny", "fur", "furniture",
                               "further", "future", "gain", "game", "garage", "garden", "gas", "gasoline", "gate",
                               "gather", "gave", "general", "generally", "gentle", "gently", "get", "getting", "giant",
                               "gift", "girl", "give", "given", "giving", "glad", "glass", "globe", "go", "goes",
                               "gold",
                               "golden", "gone", "good", "goose", "got", "government", "grabbed", "grade", "gradually",
                               "grain", "grandfather", "grandmother", "graph", "grass", "gravity", "gray", "great",
                               "greater", "greatest", "greatly", "green", "grew", "ground", "group", "grow", "grown",
                               "growth", "guard", "guess", "guide", "gulf", "gun", "habit", "had", "hair", "half",
                               "halfway", "hall", "hand", "handle", "handsome", "hang", "happen", "happened", "happily",
                               "happy", "harbor", "hard", "harder", "hardly", "has", "hat", "have", "having", "hay",
                               "he",
                               "headed", "heading", "health", "heard", "hearing", "heart", "heat", "heavy", "height",
                               "held", "hello", "help", "helpful", "her", "herd", "here", "herself", "hidden", "hide",
                               "high", "higher", "highest", "highway", "hill", "him", "himself", "his", "history",
                               "hit",
                               "hold", "hole", "hollow", "home", "honor", "hope", "horn", "horse", "hospital", "hot",
                               "hour", "house", "how", "however", "huge", "human", "hundred", "hung", "hungry", "hunt",
                               "hunter", "hurried", "hurry", "hurt", "husband", "ice", "idea", "identity", "if", "ill",
                               "image", "imagine", "immediately", "importance", "important", "impossible", "improve",
                               "in", "inch", "include", "including", "income", "increase", "indeed", "independent",
                               "indicate", "individual", "industrial", "industry", "influence", "information", "inside",
                               "instance", "instant", "instead", "instrument", "interest", "interior", "into",
                               "introduced", "invented", "involved", "iron", "is", "island", "it", "its", "itself",
                               "jack", "jar", "jet", "job", "join", "joined", "journey", "joy", "judge", "jump",
                               "jungle",
                               "just", "keep", "kept", "key", "kids", "kill", "kind", "kitchen", "knew", "knife",
                               "know",
                               "knowledge", "known", "label", "labor", "lack", "lady", "laid", "lake", "lamp", "land",
                               "language", "large", "larger", "largest", "last", "late", "later", "laugh", "law", "lay",
                               "layers", "lead", "leader", "leaf", "learn", "least", "leather", "leave", "leaving",
                               "led",
                               "left", "leg", "length", "lesson", "let", "letter", "level", "library", "lie", "life",
                               "lift", "light", "like", "likely", "limited", "line", "lion", "lips", "liquid", "list",
                               "listen", "little", "live", "living", "load", "local", "locate", "location", "log",
                               "lonely", "long", "longer", "look", "loose", "lose", "loss", "lost", "lot", "loud",
                               "love",
                               "lovely", "low", "lower", "luck", "lucky", "lunch", "lungs", "lying", "machine",
                               "machinery", "mad", "made", "magic", "magnet", "mail", "main", "mainly", "major", "make",
                               "making", "man", "managed", "manner", "manufacturing", "many", "map", "mark", "market",
                               "married", "mass", "massage", "master", "material", "mathematics", "matter", "may",
                               "maybe", "me", "meal", "mean", "means", "meant", "measure", "meat", "medicine", "meet",
                               "melted", "member", "memory", "men", "mental", "merely", "met", "metal", "method",
                               "mice",
                               "middle", "might", "mighty", "mile", "military", "milk", "mill", "mind", "mine",
                               "minerals", "minute", "mirror", "missing", "mission", "mistake", "mix", "mixture",
                               "model",
                               "modern", "molecular", "moment", "money", "monkey", "month", "mood", "moon", "more",
                               "morning", "most", "mostly", "mother", "motion", "motor", "mountain", "mouse", "mouth",
                               "move", "movement", "movie", "moving", "mud", "muscle", "music", "musical", "must", "my",
                               "myself", "mysterious", "nails", "name", "nation", "national", "native", "natural",
                               "naturally", "nature", "near", "nearby", "nearer", "nearest", "nearly", "necessary",
                               "neck", "needed", "needle", "needs", "negative", "neighbor", "neighborhood", "nervous",
                               "nest", "never", "new", "news", "newspaper", "next", "nice", "night", "nine", "no",
                               "nobody", "nodded", "noise", "none", "noon", "nor", "north", "nose", "not", "note",
                               "noted", "nothing", "notice", "noun", "now", "number", "numeral", "nuts", "object",
                               "observe", "obtain", "occasionally", "occur", "ocean", "of", "off", "offer", "office",
                               "officer", "official", "oil", "old", "older", "oldest", "on", "once", "one", "only",
                               "onto", "open", "operation", "opinion", "opportunity", "opposite", "or", "orange",
                               "orbit",
                               "order", "ordinary", "organization", "organized", "origin", "original", "other", "ought",
                               "our", "ourselves", "out", "outer", "outline", "outside", "over", "own", "owner",
                               "oxygen",
                               "pack", "package", "page", "paid", "pain", "paint", "pair", "palace", "pale", "pan",
                               "paper", "paragraph", "parallel", "parent", "park", "part", "particles", "particular",
                               "particularly", "partly", "parts", "party", "pass", "passage", "past", "path", "pattern",
                               "pay", "peace", "pen", "pencil", "people", "per", "percent", "perfect", "perfectly",
                               "perhaps", "period", "person", "personal", "pet", "phrase", "physical", "piano", "pick",
                               "picture", "pictured", "pie", "piece", "pig", "pile", "pilot", "pine", "pink", "pipe",
                               "pitch", "place", "plain", "plan", "plane", "planet", "planned", "planning", "plant",
                               "plastic", "plate", "plates", "play", "pleasant", "please", "pleasure", "plenty",
                               "plural",
                               "plus", "pocket", "poem", "poet", "poetry", "point", "pole", "police", "policeman",
                               "political", "pond", "pony", "pool", "poor", "popular", "population", "porch", "port",
                               "position", "positive", "possible", "possibly", "post", "pot", "potatoes", "pound",
                               "pour",
                               "powder", "power", "powerful", "practical", "practice", "prepare", "present",
                               "president",
                               "press", "pressure", "pretty", "prevent", "previous", "price", "pride", "primitive",
                               "principal", "principle", "printed", "private", "prize", "probably", "problem",
                               "process",
                               "produce", "product", "production", "program", "progress", "promised", "proper",
                               "properly", "property", "protection", "proud", "prove", "provide", "public", "pull",
                               "pupil", "pure", "purple", "purpose", "push", "put", "putting", "quarter", "queen",
                               "question", "quick", "quickly", "quiet", "quietly", "quite", "rabbit", "race", "radio",
                               "railroad", "rain", "raise", "ran", "ranch", "range", "rapidly", "rate", "rather", "raw",
                               "rays", "reach", "read", "reader", "ready", "real", "realize", "rear", "reason",
                               "recall",
                               "receive", "recent", "recently", "recognize", "record", "red", "refer", "refused",
                               "region", "regular", "related", "relationship", "religious", "remain", "remarkable",
                               "remember", "remove", "repeat", "replace", "replied", "report", "represent", "require",
                               "research", "respect", "rest", "result", "return", "review", "rhyme", "rhythm", "rice",
                               "rich", "ride", "riding", "right", "ring", "rise", "rising", "river", "road", "roar",
                               "rock", "rocket", "rocky", "rod", "roll", "roof", "room", "root", "rope", "rose",
                               "rough",
                               "round", "route", "row", "rubbed", "rubber", "rule", "ruler", "run", "running", "rush",
                               "sad", "saddle", "safe", "safety", "said", "sail", "sale", "salmon", "salt", "same",
                               "sand", "sang", "sat", "satellites", "satisfied", "save", "saved", "saw", "say", "scale",
                               "scared", "scene", "school", "science", "scientific", "scientist", "score", "screen",
                               "sea", "search", "season", "seat", "second", "secret", "section", "see", "seed",
                               "seeing",
                               "seems", "seen", "seldom", "select", "selection", "sell", "send", "sense", "sent",
                               "sentence", "separate", "series", "serious", "serve", "service", "sets", "setting",
                               "settle", "settlers", "seven", "several", "shade", "shadow", "shake", "shaking", "shall",
                               "shallow", "shape", "share", "sharp", "she", "sheep", "sheet", "shelf", "shells",
                               "shelter", "shine", "shinning", "ship", "shirt", "shoe", "shoot", "shop", "shore",
                               "short",
                               "shorter", "shot", "should", "shoulder", "shout", "show", "shown", "shut", "sick",
                               "sides",
                               "sight", "sign", "signal", "silence", "silent", "silk", "silly", "silver", "similar",
                               "simple", "simplest", "simply", "since", "sing", "single", "sink", "sister", "sit",
                               "sitting", "situation", "six", "size", "skill", "skin", "sky", "slabs", "slave", "sleep",
                               "slept", "slide", "slight", "slightly", "slip", "slipped", "slope", "slow", "slowly",
                               "small", "smaller", "smallest", "smell", "smile", "smoke", "smooth", "snake", "snow",
                               "so",
                               "soap", "social", "society", "soft", "softly", "soil", "solar", "sold", "soldier",
                               "solid",
                               "solution", "solve", "some", "somebody", "somehow", "someone", "something", "sometime",
                               "somewhere", "son", "song", "soon", "sort", "sound", "source", "south", "southern",
                               "space", "speak", "special", "species", "specific", "speech", "speed", "spell", "spend",
                               "spent", "spider", "spin", "spirit", "spite", "split", "spoken", "sport", "spread",
                               "spring", "square", "stage", "stairs", "stand", "standard", "star", "stared", "start",
                               "state", "statement", "station", "stay", "steady", "steam", "steel", "steep", "stems",
                               "step", "stepped", "stick", "stiff", "still", "stock", "stomach", "stone", "stood",
                               "stop",
                               "stopped", "store", "storm", "story", "stove", "straight", "strange", "stranger",
                               "straw",
                               "stream", "street", "strength", "stretch", "strike", "string", "strip", "strong",
                               "stronger", "struck", "structure", "struggle", "stuck", "student", "studied", "studying",
                               "subject", "substance", "success", "successful", "such", "sudden", "suddenly", "sugar",
                               "suggest", "suit", "sum", "summer", "sun", "sunlight", "supper", "supply", "support",
                               "suppose", "sure", "surface", "surprise", "surrounded", "swam", "sweet", "swept", "swim",
                               "swimming", "swing", "swung", "syllable", "symbol", "system", "table", "tail", "take",
                               "taken", "tales", "talk", "tall", "tank", "tape", "task", "taste", "taught", "tax",
                               "tea",
                               "teach", "teacher", "team", "tears", "teeth", "telephone", "television", "tell",
                               "temperature", "ten", "tent", "term", "terrible", "test", "than", "thank", "that",
                               "thee",
                               "them", "themselves", "then", "theory", "there", "therefore", "these", "they", "thick",
                               "thin", "thing", "think", "third", "thirty", "this", "those", "thou", "though",
                               "thought",
                               "thousand", "thread", "three", "threw", "throat", "through", "throughout", "throw",
                               "thrown", "thumb", "thus", "thy", "tide", "tie", "tight", "tightly", "till", "time",
                               "tin",
                               "tiny", "tip", "tired", "title", "to", "tobacco", "today", "together", "told",
                               "tomorrow",
                               "tone", "tongue", "tonight", "too", "took", "tool", "top", "topic", "torn", "total",
                               "touch", "toward", "tower", "town", "toy", "trace", "track", "trade", "traffic", "trail",
                               "train", "transportation", "trap", "travel", "treated", "tree", "triangle", "tribe",
                               "trick", "tried", "trip", "troops", "tropical", "trouble", "truck", "trunk", "truth",
                               "try", "tube", "tune", "turn", "twelve", "twenty", "twice", "two", "type", "typical",
                               "uncle", "under", "underline", "understanding", "unhappy", "union", "unit", "universe",
                               "unknown", "unless", "until", "unusual", "up", "upon", "upper", "upward", "us", "use",
                               "useful", "using", "usual", "usually", "valley", "valuable", "value", "vapor", "variety",
                               "various", "vast", "vegetable", "verb", "vertical", "very", "vessels", "victory", "view",
                               "village", "visit", "visitor", "voice", "volume", "vote", "vowel", "voyage", "wagon",
                               "wait", "walk", "wall", "want", "war", "warm", "warn", "was", "wash", "waste", "watch",
                               "water", "wave", "way", "we", "weak", "wealth", "wear", "weather", "week", "weigh",
                               "weight", "welcome", "well", "went", "were", "west", "western", "wet", "whale", "what",
                               "whatever", "wheat", "wheel", "when", "whenever", "where", "wherever", "whether",
                               "which",
                               "while", "whispered", "whistle", "white", "who", "whole", "whom", "whose", "why", "wide",
                               "widely", "wife", "wild", "will", "willing", "win", "wind", "window", "wing", "winter",
                               "wire", "wise", "wish", "with", "within", "without", "wolf", "women", "won", "wonder",
                               "wonderful", "wood", "wooden", "wool", "word", "wore", "work", "worker", "world",
                               "worried", "worry", "worse", "worth", "would", "wrapped", "write", "writer", "writing",
                               "written", "wrong", "wrote", "yard", "year", "yellow", "yes", "yesterday", "yet", "you",
                               "young", "younger", "your", "yourself", "youth", "zero", "zebra", "zipper", "zoo",
                               "zulu"];
                break
            case 1:
                randomWords = ["аароновец", "абажур", "аббат", "аббревиатура", "абброморфема", "абвер", "абверовец",
                               "абдикация", "абдомен", "абдоминальный", "абдуктор", "аберрация", "абзац", "абиетин",
                               "абиогенез", "абиссаль", "абитура", "аблактировать", "аблаут", "абляция", "аболиционист",
                               "абонемент", "абонент", "абонирование", "абордаж", "абориген", "аборт", "абразив",
                               "абракадабра", "абрек", "абрикос", "абрикотин", "арбуз", "апельсин", "абрис",
                               "аброгация",
                               "абсент", "абсолют", "абсолютизирование", "абсолютизм", "абсорбент", "абстрактность",
                               "абсурд", "абсцисса", "авангард", "аванс", "авантаж", "авантюра", "авария", "август",
                               "банкнота", "Байкал", "баба", "багаж", "багор", "багрянец", "база", "базальт", "базар",
                               "базилик", "базука", "байкер", "байт", "бак", "баклан", "баклажка", "бакс", "бактерия",
                               "банан", "банда", "бандероль", "бампер", "баобаб", "банзай", "банка", "банк", "бант",
                               "барак", "баран", "бард", "барий", "басня", "вагина", "вагон", "вагонетка", "ваза",
                               "ВАЗ",
                               "вакансия", "вакуум", "вакцина", "вал", "валенки", "валериана", "валет", "валик",
                               "валун",
                               "валькирия", "вальс", "вальцовка", "вальяжность", "валюта", "ведьма", "вампир",
                               "вампиризм", "век", "велосипед", "вена", "венец", "вера", "верблюд", "габардин",
                               "габитус",
                               "гавань", "гадалка", "гадкий", "гадюка", "газ", "гайка", "газета", "газовоз", "газон",
                               "галдёж", "галерея", "галка", "галеты", "гаметы", "гараж", "гарнизон", "даль", "дьявол",
                               "дама", "дамба", "дамка", "дань", "дар", "дартс", "даун", "дача", "два", "движок",
                               "дверь",
                               "динозавр", "двор", "дворец", "дворняга", "дворник", "двоякий", "двустволка", "дебаты",
                               "дебош", "евнух", "еврей", "евро", "Европа", "европеец", "егерь", "еда", "едкий", "ель",
                               "енот", "ересь", "ерик", "ехидна", "естество", "ёж", "ёлка", "ёмкость", "ёршик", "жаба",
                               "жабры", "жадина", "жажда", "жакет", "жало", "жалоба", "жалюзи", "жар", "жир", "желатин",
                               "желе", "железа", "железо", "жёлоб", "желток", "жёлудь", "жеребец", "женьшень",
                               "женщина",
                               "жеребий", "жертва", "жестянка", "жесть", "жёстко", "жетон", "живот", "животноводство",
                               "животное", "жижа", "Жигули", "жизнь", "жилет", "жилище", "жнец", "жлоб", "житие",
                               "забег",
                               "забор", "завал", "завеса", "завод", "завялый", "заветный", "завидный", "завуч", "загс",
                               "зад", "задание", "зажора", "зазор", "заря", "заказ", "закал", "закалка", "заяц",
                               "закат",
                               "заклёпка", "закрома", "зал", "закуп", "залп", "залог", "залив", "замах", "замес",
                               "замок",
                               "замш", "замысел", "зануда", "запад", "западный", "занос", "запах", "запас", "записка",
                               "запинка", "ива", "игла", "игра", "игрок", "идеал", "игуана", "идиот", "идея", "идол",
                               "иероглиф", "изба", "изгиб", "изгой", "изгородь", "изжога", "излом", "изложение",
                               "измена",
                               "изо", "износ", "изумруд", "изюм", "икра", "икс", "имитация", "импорт", "имя", "индивид",
                               "индиго", "интервью", "интрига", "интуиция", "инфаркт", "интим", "инцест", "ирис",
                               "искатель", "искра", "ислам", "испуг", "исход", "Иуда", "июль", "июнь", "ищейка", "йети",
                               "йог", "йога", "йогурт", "кабан", "кабачок", "кабель", "кабина", "каблук", "кадет",
                               "код",
                               "кадр", "кадык", "казачество", "казино", "казна", "казначейство", "калач", "калека",
                               "календарь", "калинка", "кальций", "камин", "камыш", "канал", "канава", "канат",
                               "каникулы", "кандидат", "канва", "канифоль", "канон", "капитан", "капитал", "капилляр",
                               "капкан", "каприз", "капрон", "капуста", "карат", "карась", "карбон", "карета", "каркас",
                               "карма", "каре", "картель", "катер", "картон", "каско", "каскадёр", "карты", "каток",
                               "качок", "каша", "лаборант", "лава", "лаваш", "лавина", "лавка", "лавры", "лаг",
                               "лагерь",
                               "лагуна", "ладонь", "лазарет", "лазер", "лак", "лакомство", "лампа", "ламинат",
                               "лампасы",
                               "лангуст", "лапа", "лапти", "лапша", "ларёк", "латы", "латунь", "латынь", "лгун",
                               "лебеда",
                               "лев", "левша", "легион", "лёгкие", "лёд", "ледокол", "ледник", "лежак", "лежебока",
                               "лейка", "лейкемия", "лекарь", "лекция", "лепка", "лён", "лепет", "лес", "леса", "лента",
                               "лепёшка", "леска", "лето", "лещ", "летяга", "лилия", "маг", "магазин", "магнитофон",
                               "Магомет", "мадонна", "мажор", "мазок", "мазохист", "мазохизм", "май", "мазь", "майка",
                               "майор", "майонез", "мак", "макро", "макет", "макрос", "макрофаги", "максимум", "малец",
                               "маломерка", "мамба", "мангал", "мангуст", "мама", "мальчик", "манор", "манёвр", "манеж",
                               "манифест", "манту", "мануфактура", "манускрипт", "манометр", "маньяк", "маразм",
                               "мораль",
                               "маркиза", "март", "марш", "маршал", "маршрутка", "маска", "масло", "масса", "массаж",
                               "массажёр", "массив", "мастер", "мат", "мастика", "мастерство", "мебель", "машина",
                               "набег", "навес", "навигатор", "навоз", "навсегда", "нога", "наглость", "нагота",
                               "нагрузка", "нагрузчик", "надежда", "надзор", "надзорный", "надпись", "название",
                               "наказ",
                               "наклон", "наколка", "накрутка", "накопитель", "налёт", "намёк", "напиток", "напоказ",
                               "нарды", "наречие", "народный", "нарост", "нарыв", "насилие", "насморк", "настилка",
                               "настрой", "настроение", "настройка", "насыпь", "натрий", "нутро", "наушник", "находка",
                               "нахлёст", "начало", "небеса", "небо", "нёбо", "невежда", "невеста", "нервы", "негатив",
                               "оазис", "обалдуй", "обвал", "обаяние", "обвес", "обвёртка", "обводка", "обёртка",
                               "оберег", "обзор", "обжог", "обиход", "обжим", "обиженный", "обиженность", "облако",
                               "область", "облепить", "облом", "обман", "обманщик", "обманчивый", "обмен", "обменённый",
                               "обнова", "обновление", "ободок", "образ", "обработка", "обряд", "обрыв", "обух",
                               "обуза",
                               "обувь", "обувка", "обувной", "обшивка", "общага", "объём", "объект", "обязательство",
                               "овца", "овал", "овёс", "овод", "огонь", "огород", "ограда", "одиночка", "один", "озеро",
                               "поляна", "паб", "павильон", "павильонный", "павлин", "павлиний", "падеж", "падение",
                               "пакля", "паладин", "палата", "палеонтолог", "Палестина", "палец", "палитра", "палка",
                               "пальма", "памятка", "памятник", "память", "панама", "панель", "пандемия", "паникёр",
                               "пано", "панк", "панты", "панцирь", "папирус", "папа", "папайя", "программа", "парад",
                               "парадокс", "паралич", "парапет", "парик", "паровоз", "пар", "парта", "партнёрство",
                               "Паскаль", "парфюм", "пауза", "пашня", "раб", "работа", "рагу", "радио", "радиус",
                               "разбор", "развитие", "развод", "разгар", "разврат", "разговор", "разгром", "разгул",
                               "разлом", "размен", "размер", "разминка", "разный", "разовый", "разнос", "разум",
                               "разряд",
                               "разруха", "разрядка", "рай", "рак", "район", "раковина", "рама", "рана", "ранг",
                               "раскат",
                               "раса", "расклад", "расплата", "распри", "рассадник", "рассада", "распятие", "рассвет",
                               "рассол", "рассказ", "рассудок", "разум", "раствор", "расход", "сабля", "сабор",
                               "саботаж",
                               "саботажник", "саботажница", "саванна", "сага", "сад", "садизм", "садик", "сайга",
                               "сакура", "сало", "сок", "салон", "сальза", "сальто", "салют", "самец", "самовар",
                               "самогон", "самолёт", "самокат", "самопал", "сани", "самса", "санузел", "сарай",
                               "Санта-Клаус", "сантехник", "сапоги", "спина", "сардина", "саха", "Сатана", "сахарный",
                               "сатира", "сборник", "свалка", "сброс", "табак", "табакерка", "табель", "табу",
                               "таблетка",
                               "табурет", "тазик", "таёжник", "таинство", "тайга", "таймер", "тайна", "талант",
                               "таксофон", "талон", "тема", "таможенник", "тампон", "танк", "танго", "танкист", "таран",
                               "тариф", "топор", "топ", "таска", "татуировка", "тварь", "театр", "тезис", "тёзка",
                               "текила", "текстиль", "тележка", "телёнок", "телеметрия", "телепорт", "телескоп",
                               "телеса",
                               "телефон", "тембр", "темнота", "темп", "температура", "теория", "УАЗ", "убыток",
                               "уважение", "увальность", "уведомитель", "увлечение", "угар", "увязка", "угасание",
                               "уголь", "улыбка", "угроза", "удав", "удар", "удалец", "удача", "удел", "удобство",
                               "удочка", "удрать", "уж", "угорь", "ужас", "ужин", "узел", "узы", "узор", "узник",
                               "узница", "уклад", "уклон", "утка", "укол", "уксус", "улитка", "утилита", "улов", "улёт",
                               "умение", "универмаг", "универсал", "упырь", "Фаберже", "фабрика", "фабрикат", "фаворит",
                               "фазан", "фаза", "файл", "факт", "факел", "факс", "фактограф", "факт", "фактура",
                               "фаллос",
                               "фальшь", "фамилия", "фальшивость", "фантазёр", "Фаренгейт", "фартук", "фарш", "фасоль",
                               "фатальность", "фауна", "февраль", "ферма", "фея", "фиаско", "фигура", "физика",
                               "физкультура", "фильм", "фильтр", "фирма", "флаг", "флейта", "флора", "фляга", "флешка",
                               "фон", "фокус", "форум", "фото", "фосфор", "хлеб", "хакер", "халат", "халва", "халява",
                               "хамство", "ханжа", "хаос", "хата", "хвала", "хвост", "хижина", "химия", "химик", "хит",
                               "хлор", "хлопок", "хлыст", "хмель", "хобби", "хобот", "холм", "ходильник", "хозяйство",
                               "холод", "цапка", "царь", "царство", "цвет", "цветок", "цедра", "Цезарь", "целевой",
                               "цель", "цена", "центр", "ценник", "цепь", "церковник", "цеп", "цианид", "цикл",
                               "циклон",
                               "цинга", "цинк", "цинизм", "циклоп", "цирк", "цитата", "цифра", "цитрус", "цуцик",
                               "чудотворец", "чага", "чадо", "чай", "чайник", "чары", "час", "частность", "частота",
                               "часть", "чат", "человек", "чело", "челюсть", "чемодан", "чемпион", "червонец", "чепуха",
                               "червь", "черновик", "чернозём", "чернослив", "чертог", "чёрт", "шабаш", "шаблон", "шаг",
                               "шаль", "шампур", "шампунь", "шар", "шамовка", "шаман", "шалава", "шанс", "шантаж",
                               "шарф",
                               "шарм", "шахтёр", "швея", "щавель", "щебёнка", "щегол", "щека", "щепка", "щетина",
                               "щётка",
                               "щуп", "щит", "щип", "эвакуация", "эвкалипт", "Эверест", "экзамен", "экипировка",
                               "экономика", "эколог", "эксперт", "экспресс", "элеватор", "юань", "юбилей", "юбка", "юг",
                               "юла", "Юпитер", "ябеда", "яблоко", "яблоня", "явность", "ягода", "ядро", "яд", "язык",
                               "ягуар", "яйцо", "як", "якорь", "яма", "ямб", "январь", "ярлык", "яркость", "ярмо",
                               "яхта",
                               "ярус", "ящик",];
                break
        }

        function GenerateWord(lengthWord) {
            let dictionaryWords;
            switch (dictionary) {
                case 0:
                    dictionaryWords = randomWords;
                    break
                case 1:
                    dictionaryWords = optionalWord.split(' ');
                    break
                case 2:
                    let optionalWords = randomWords.concat(optionalWord.split(' '));
                    dictionaryWords = optionalWords;
                    break
            }

            word = dictionaryWords[Math.floor(Math.random() * dictionaryWords.length)];
            if (lengthWord > 0 && word.length !== lengthWord) GenerateWord(lengthWord);
        }

        function CountWords(countWord) {
            let words = [];
            for (let i = 0; i < countWord; i++) {
                GenerateWord(lengthWord);
                words.push(word);
            }
            word = words;
        }

        GenerateWord(lengthWord);
        CountWords(countWord);
        const type = parseInt(data.storage);
        const varName = this.evalMessage(data.varName, cache);
        this.storeValue(word, type, varName, cache);
        this.callNextAction(cache);
    },

    mod() {
    },
};
