import {defineStore} from "pinia";


export const useWordStore = defineStore('words', () => {


    // pull in these words intead:
    // https://sightwords.com/sight-words/fry/

    const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L",
        "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]


    const alphabetAZ = alphabet


    const prek = [
        "a", "and", "away", "big", "blue", "can", "come", "down", "find", "for", "funny", "go", "help", "here", "I",
        "in", "is", "it", "jump", "little", "look", "make", "me", "my", "not", "one", "play", "red", "run", "said",
        "see", "the", "three", "to", "two", "up", "we", "where", "yellow", "you"
    ]

    const kinder = [
        "all", "am", "are", "at", "ate", "be", "black", "brown", "but", "came", "did", "do", "eat", "four", "get",
        "good", "have", "he", "into", "like", "must", "new", "no", "now", "on", "our", "out", "please", "pretty", "ran",
        "ride", "saw", "say", "she", "so", "soon", "that", "there", "they", "this", "too", "under", "want", "was",
        "well", "went", "what", "white", "who", "will", "with", "yes"
    ]

    const first = [
        "after", "again", "an", "any", "as", "ask", "by", "could", "every", "fly", "from", "give", "going", "had",
        "has", "her", "him", "his", "how", "just", "know", "let", "live", "may", "of", "old", "once", "open", "over",
        "put", "round", "some", "stop", "take", "thank", "them", "then", "think", "walk", "were", "when"
    ]

    const second = [
        "always", "around", "because", "been", "before", "best", "both", "buy", "call", "cold", "does", "don’t", "fast",
        "first", "five", "found", "gave", "goes", "green", "its", "made", "many", "off", "or", "pull", "read", "right",
        "sing", "sit", "sleep", "tell", "their", "these", "those", "upon", "us", "use", "very", "wash", "which", "why",
        "wish", "work", "would", "write", "your"
    ]

    const third = [
        "about", "better", "bring", "carry", "clean", "cut", "done", "draw", "drink", "eight", "fall", "far", "full",
        "got", "grow", "hold", "hot", "hurt", "if", "keep", "kind", "laugh", "light", "long", "much", "myself", "never",
        "only", "own", "pick", "seven", "shall", "show", "six", "small", "start", "ten", "today", "together", "try",
        "warm"
    ]

    const nouns = [
        "apple", "baby", "back", "ball", "bear", "bed", "bell", "bird", "birthday", "boat", "box", "boy", "bread",
        "brother", "cake", "car", "cat", "chair", "chicken", "children", "Christmas", "coat", "corn", "cow", "day",
        "dog", "doll", "door", "duck", "egg", "eye", "farm", "farmer", "father", "feet", "fire", "fish", "floor",
        "flower", "game", "garden", "girl", "goodbye", "grass", "ground", "hand", "head", "hill", "home", "horse",
        "house", "kitty", "leg", "letter", "man", "men", "milk", "money", "morning", "mother", "name", "nest", "night",
        "paper", "party", "picture", "pig", "rabbit", "rain", "ring", "robin", "Santa Claus", "school", "seed", "sheep",
        "shoe", "sister", "snow", "song", "squirrel", "stick", "street", "sun", "table", "thing", "time", "top", "toy",
        "tree", "watch", "water", "way", "wind", "window", "wood"
    ]

    const additionProblems = Array.from({ length: 100 }, (_, i) => {
        const a = Math.floor(i / 10);
        const b = i % 10;
        return { a, b, method: '+', problem: `${a} + ${b}`, answer: a + b };
    });

    const multProblems = Array.from ({length: 110}, (_,i) => {
        const a = Math.floor(i / 10);
        const b = i % 10;
        return { a, b, method: '*', problem: `${a} &times; ${b}`, answer: a * b };
    })

    const doubles = additionProblems.filter(item=> item.a === item.b)

    const multDoubles = multProblems.filter(item => item.a === item.b)




    const dictionary = {
        "alphabetAZ": alphabetAZ,
        "alphabet": alphabet,
        "pre-k": prek,
        "kinder": kinder,
        "first": first,
        "second": second,
        "third": third,
        "nouns": nouns,
        "all": [...prek, ...kinder, ...first, ...second, ...third, ...nouns],
        addition: additionProblems,
        multiplication: multProblems,
        doubles: doubles,
        multDoubles: multDoubles
    }

    dictionary.short = dictionary.all.filter(word => word.length <= 3)

    function getList(listName) {
        return [...dictionary[listName] || ["List " + listName + " not found."]]
    }


    return {getList}

})