import {words} from "./words_alpha.ts";

/**
 * A string representing the pattern to search for. Use numbers (0-9) to represent the same letters. Use normal
 * letters to represent known letters
 */
export function findWords(pattern: string){
  const regex = getRegex(pattern.toLowerCase());

  return words.filter(w => {
    if(w.length !== pattern.length){
      return false;
    }

    return regex.test(w);
  })
}

export function getRegex(pattern: string){
  // generate a regular expression from the pattern
  const chars = pattern.split("");

  const excludedLetters = Array.from(new Set(chars.filter(char => char.match(/[a-z]/))));

  let regex = '';
  let captureGroups: Record<string, number> = {}
  regex += '^';
  chars.forEach((char) => {
   if (char === '.') {
      // any
      regex += `.`
    } else if (char.match(/[a-z]|\s/)) {
      regex += char;
    } else {
      // assume its a vowel
       // if it's a number

       if(captureGroups[char] === undefined){
         // new capture group
         const allExistingCaptureGroups = Object.values(captureGroups).map(g => `\\${g}`);
         const nextCaptureGroup = allExistingCaptureGroups.length + 1;


         captureGroups[char] = nextCaptureGroup;

         const exclude = [...allExistingCaptureGroups, ...excludedLetters];
         if(exclude.length > 0){
           regex += `(?!${exclude.join('|')})`
         }
         if(char.match(/[0-9]/)){
           regex+= `(.)`
         } else {
           regex+= `([${['a', 'e', 'i', 'o', 'u'].filter(v => !exclude.includes(v)).join('')}])`
         }

       } else {
         // existing capture group
         regex += `\\${captureGroups[char]}`
       }


   }
  })

  regex += '$';

  return new RegExp(regex);
}