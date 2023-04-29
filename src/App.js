import './App.css';
import SourceParagraph from './components/SourceParagraph'
import TranslatedText from './components/TranslatedText'
import { useState, useEffect } from 'react'
import axios from 'axios'
const API_KEY = process.env.REACT_APP_API_KEY

function App() {
  const [highlighting, setHighlighting] = useState(false)
  const [textToTranslate, setTextToTranslate] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [sampleText, setSampleText] = useState('')

  console.log(process.env)

  // GET sample text from DB
  useEffect(() => {
    const getSampleText = async () => {
      const res = await fetchSampleText()
      setSampleText(res.text)
    }
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

  // After setting textToTranslate translate that text and save it in state
  useEffect(() => {
    if(textToTranslate) {
      translateText(textToTranslate, 'en', 'es')
    }
  },[textToTranslate])

  // Fetch writing sample from DB
  const fetchSampleText = async () => {
    const res = await fetch('http://localhost:5000/sampleText')
    const data = await res.json()

    return data
  }

  // Call api to translate text
  const translateText = async (q, target, source) => {
    console.log(q)
    try {
      const response = await axios.post(
        `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`,
        {
          q,
          target,
          source,
        }
      )
      setTranslatedText(response.data.data.translations[0].translatedText);
    } catch (error) {
      console.error('ya goofed');
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        LingoDeck
      </header>
      <SourceParagraph sampleText={sampleText} />
      <TranslatedText translatedText={translatedText} />
    </div>
  );
}

export default App;
