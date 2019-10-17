import React from 'react';
import './App.scss';
import MoviesList from './components/MovieList';
import Logo from './assets/logo.png';


function App() {
  return (
    <div className="App">
      <div className="brandLogo">
        <img src={Logo}></img>
      </div>
      <header className="App-header">
        <MoviesList />
      </header>
      <footer style={{marginTop: 10}}>
	<p>
		Laget med ❤️ av
		<a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/madsafrost/" style={{marginLeft: 2, marginRight: 3}}>  Mads Klynderud</a>
		- Andre prosjekter på
		<a target="_blank" rel="noopener noreferrer" href="https://github.com/MadsFrost">
			 <span style={{marginLeft: 4}}>Github </span> 
		</a>
     - Movie API:
    <a target="_blank" rel="noopener noreferrer" href="http://www.omdbapi.com/">
			 <span style={{marginLeft: 4}}>OMDBapi</span> 
		</a>
	</p>
</footer>
    </div>
  );
}

export default App;
