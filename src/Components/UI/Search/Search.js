import react,{useState,useEffect} from "react"
import classes from "./Search.module.css"
import Turnstone from 'turnstone'


function Search(props) {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [query,setQuery]=useState(null)

  useEffect(() => {
    if (query) {
      fetch(`https://voithy-dev-v1.azurewebsites.net/api/v1/general/search?name=${query}`)
        .then(response => response.json())
        .then(data => setSearchResults(data.data.data));
    }
  }, [query]);

  const handleResultSelection = result => {
    setSelectedResult(result);
    props.handleMedCreation(result)
  };

  return (
    <div>
      <input
        type="text"
        
        onChange={event => setQuery(event.target.value)}
        placeholder="search for med"
      />
      {searchResults.length > 0 && (
        <ul>
          {searchResults.map(result => (
            <li key={result._id} onClick={() => handleResultSelection(result)}>
              {result.PackageName} ({result.GenericName})
            </li>
          ))}
        </ul>
      )}
      {selectedResult && (
        <div>
          You selected: {selectedResult.PackageName} ({selectedResult.GenericName})
        </div>
      )}
    </div>
  );
}


export default Search;
