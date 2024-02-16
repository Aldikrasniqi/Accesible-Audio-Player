import AudioPlayer from './components/audio-player/audio-player';
import './App.css';

function App() {
  const src =
    'https://d21kofsrtbjnsd.cloudfront.net/transcoder/devmode0134_128kbps_44100_1c.mp3';
  const transcript = (
    // if there is a transcript, include it here

    <>
      <p>
        This is the transcript of the audio file. It should be included here so
        that the user can read along with the audio.
      </p>
      <a href="https://www.thisamericanlife.org/791/transcript">Transcript</a>
    </>
  );
  return (
    <>
      <div className="App">
        <header className="App-player">
          <h1>Accesible Audio Player</h1>
        </header>
        <main>
          <AudioPlayer src={src} transcript={transcript} />
        </main>
      </div>
    </>
  );
}

export default App;
