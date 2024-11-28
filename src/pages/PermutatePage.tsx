import {useState} from "react";
import {permutate} from "../lib/permutate.ts";

function PermutatePage(){
  const [startWord, setStartWord] = useState('shelf');
  const [endWord, setEndWord] = useState('board');

  const [excludedWords, setExcludedWords] = useState<string[]>([]);

  const permutations = permutate(startWord, endWord);

  const permutationsFiltered = permutations.map(p => {
    return p.map(step => {
      return {
        ...step,
        words: step.words.filter(w => !excludedWords.includes(w))
      }
    })
  }).filter(p => p.every(step => step.words.length > 0));

  return <div className={'flex flex-col gap-2 p-2'}>
    <input value={startWord} className={'bg-slate-200 px-2 py-1 rounded border border-slate-300'} onChange={(e) => setStartWord(e.target.value)} />
    <input value={endWord} className={'bg-slate-200 px-2 py-1 rounded border border-slate-300'}  onChange={(e) => setEndWord(e.target.value)} />
    <div className={'flex'}>{
      excludedWords.map(w => <span onClick={() => setExcludedWords(excludedWords.filter(e => e !== w))} className={'bg-red-100 p-0.5 rounded mx-0.5'}>{w}</span>)
    }</div>
    {permutationsFiltered.map(p => (<p>
      {`${startWord} -> `}
      {p.map(p => <>
        {p.words.map(p => <span onClick={() => setExcludedWords(w => [...w, p])} className={'bg-slate-100 p-0.5 rounded mx-0.5'}>{`${p}`}</span>)}
        {`-> `}
      </>)}
      {`${endWord}`}
    </p>))}
  </div>
}

export default PermutatePage