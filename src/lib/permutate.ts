import {words as allWords} from "./words_alpha.ts";

const WORD_LENGTH = 5;

const words = allWords.filter(w => w.length === 5);

interface StepData {
  letters: string[];
  words: string[]
}

export function findWordsWithLetters(letters: string[]) {
  return words.filter(w => {
    if (w.length !== letters.length) {
      return false;
    }

    return letters.every((letter) => w.includes(letter));
  });
}

function dedupeUnorderedArrays(arrs: string[][]){
  return arrs.filter((arr, index) => {
    const arrString = arr.sort().join('');
    return arrs.findIndex((arr2) => arr2.sort().join('') === arrString) === index;
  })
}

export function permutate(startWord: string, endWord: string) {

  if (WORD_LENGTH !== endWord.length || WORD_LENGTH !== startWord.length) {
    return [];
  }

  let results: StepData[][] = [[{words: [startWord], letters: startWord.split('').sort()}]];

  for(let i = 0; i < WORD_LENGTH -2; i++){
    console.log(`step ${i +1} (${results.length})`)

    const newResults: StepData[][] = [];

    results.forEach((result) => {
      const lastStep = result[result.length-1];
      // find all words that are one step away from this word

      // find what candidate letters are remaining to be used (all words in the target letter that arent in the current word
      const currentLetters = lastStep.letters
      const lettersToRemove = currentLetters.filter((letter) => !endWord.includes(letter));
      const candidateLetters = endWord.split('').filter((letter) => !lastStep.letters.includes(letter));

      // find every combination of letters that are one step away
      const possibleLetterCombinations = dedupeUnorderedArrays(candidateLetters.map((letter) => {
        // put in this letter into each letter that could be removed
        return lettersToRemove.map((removeLetter) => {
          return [...currentLetters.filter((l) => l !== removeLetter), letter].sort()
        })
      }).flat());

      const wordsForLetterCombinations: StepData[] = possibleLetterCombinations.map((letters) => ({letters, words: findWordsWithLetters(letters)}))

      const filteredWordsForLetterCombinations = wordsForLetterCombinations.filter((step) => step.words.length > 0)

      if(filteredWordsForLetterCombinations.length > 0){
        if(i === 0){
          // first iteration, overwrite as don't want to include the initial word in the output
          newResults.push(...filteredWordsForLetterCombinations.map(step => [step]))
        } else {

         newResults.push(...filteredWordsForLetterCombinations.map((step) => [...result, step]))
        }
      }
    })


    results = newResults;
  }


  return results
}