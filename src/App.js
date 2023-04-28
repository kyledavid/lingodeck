import './App.css';
import SourceParagraph from './components/SourceParagraph'
import TranslatedText from './components/TranslatedText'
import { useState, useEffect } from 'react'

function App() {
  const [highlighting, setHighlighting] = useState(false)
  const [textToTranslate, setTextToTranslate] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [sampleText, setSampleText] = useState('')

  // GET sample text from DB
  useEffect(() => {
    const getSampleText = async () => {
      const res = await fetchSampleText()
      setSampleText(res.text)
    }
    console.log('useEffect ran')
    getSampleText()
  },[])

  // Set listener for User highlighting text on the webpage
  useEffect(() => {
    const handleHighlight = () => {
      const selection = window.getSelection()
      if (selection && !selection.isCollapsed) {
        setTextToTranslate(selection.toString())
      }
    }

    document.addEventListener('mouseup', handleHighlight)

    return () => {
      document.removeEventListener('mouseup', handleHighlight)
    }

  }, [])

  const fetchSampleText = async () => {
    const res = await fetch('http://localhost:5000/sampleText')
    const data = await res.json()

    return data
  }

  return (
    <div className="App">
      <header className="App-header">
        LingoDeck
      </header>
      <SourceParagraph sampleText={sampleText} />
      <TranslatedText translatedText={textToTranslate} />
    </div>
  );
}

export default App;
