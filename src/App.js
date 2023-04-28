import './App.css';
import SourceParagraph from './components/SourceParagraph'
import TranslatedText from './components/TranslatedText'
import { useState, useEffect } from 'react'

function App() {
  const [highlighting, setHighlighting] = useState(false)
  const [textToTranslate, setTextToTranslate] = useState('')
  const [translatedText, setTranslatedText] = useState('')

  useEffect(() => {
    const getSampleText = async () => {
      const sampleText = await fetchSampleText()
      setTextToTranslate(sampleText)
    }

    getSampleText()
  },[])

  const fetchSampleText = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

  return (
    <div className="App">
      <header className="App-header">
        LingoDeck
      </header>
      <SourceParagraph />
      <TranslatedText />
    </div>
  );
}

export default App;
