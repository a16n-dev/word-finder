import {useMemo, useState} from "react";
import {findWords} from "../lib/findWords.tsx";

function WordPatternPage() {

  const [value, setValue] = useState<string>("")

  const result = useMemo(() => findWords(value), [value])

  return (
    <div className={'h-full flex flex-col pt-8 px-4 text-lg'}>
      <h1 className={'text-2xl font-semibold pb-2'}>Word Pattern Matcher</h1>
      <input className={'font-mono bg-slate-200 border-slate-300 border rounded text-xl py-1 px-2'} placeholder={'123344n'} autoFocus autoCapitalize={'off'} autoComplete={'off'} autoCorrect={'off'} id={Date.now().toString(16)} type="text" value={value} onChange={(e) => setValue(e.target.value)} />
      <div className={'text-sm py-2 font-semibold text-slate-400'}>{`${result.length} results`}</div>
      <hr className={'my-2'}/>
      <ul>{result.map((v => <li className={'my-1 bg-slate-100 rounded py-1 px-2'}>{v}</li>))}</ul>
      <p className={'text-sm text-slate-500 pt-2 text-center'}>Use numbers (0-9) to represent unknown letters. Use symbols (@,$,...) to represent unknown vowels.</p>
    </div>
  )
}

export default WordPatternPage
