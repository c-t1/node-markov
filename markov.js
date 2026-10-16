class MarkovMachine {

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  makeChains() {
    let chains = new Map();

    for (let i = 0; i < this.words.length; i++) {
      let word = this.words[i];
      let nextWord = this.words[i + 1] || null;

      if (chains.has(word)) {
        chains.get(word).push(nextWord);
      } else {
        chains.set(word, [nextWord]);
      }
    }
    this.chains = chains;
  }

    static choice(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    }

  /** return random text from chains */

  makeText(numWords = 100) {
    let keys = Array.from(this.chains.keys());
    let word = MarkovMachine.choice(keys);
    let out = [];

    while(out.length < numWords && word !== null) {
      out.push(word);
      word = MarkovMachine.choice(this.chains.get(word));
    }
    return out.join(" ");
  }
}

module.exports = { MarkovMachine };