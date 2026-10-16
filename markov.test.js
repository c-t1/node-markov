const { MarkovMachine } = require("./markov");

describe("MarkovMachine", function () {
  test("makeChains builds the word -> next-words map", function () {
    let mm = new MarkovMachine("the cat in the hat");

    expect(mm.chains).toEqual(
      new Map([
        ["the", ["cat", "hat"]],
        ["cat", ["in"]],
        ["in", ["the"]],
        ["hat", [null]],
    ] )
    );
  });

  test("makeText never goes over numWords", function () {
    let mm = new MarkovMachine("the cat in the hat is in the hat");
    let words = mm.makeText(5).split(" ");

    expect(words.length).toBeLessThanOrEqual(5);
  });

  test("every word in the output follows a real link in the chains", function () {
    let mm = new MarkovMachine("the cat in the hat is in the hat");
    let words = mm.makeText(50).split(" ");

    for (let i = 0; i < words.length - 1; i++) {
      expect(mm.chains.get(words[i])).toContain(words[i + 1]);
    }
  });

  test("a one-word text produces just that word", function () {
    let mm = new MarkovMachine("hello");

    expect(mm.makeText()).toBe("hello");
  });
});