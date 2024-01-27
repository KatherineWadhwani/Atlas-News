/* Purpose: News App that displays recent articles. Features include filtering articles by category and searching articles by title. */

import logo from '../logo.png';
import '../Styles/App.css';
import { db } from "../firebase-main";
import React, { useEffect, useState } from "react";
import { collection, query, getDocs, where } from "firebase/firestore";
import { RadioButton } from 'primereact/radiobutton';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import DropdownCard from '../Components/DropdownCard';
import { MdOutlineCancel } from "react-icons/md";

let articleObjects = [];

// Creates class to hold article information
class ArticleObject {
  constructor(
    URL,
    title,
    IMG,
    summary,
    source,
    date
  ) {
    this.IMG = IMG;
    this.url = URL;
    this.title = title;
    this.summary = summary;
    this.source = source;
    this.date = date;
  }
}

var isMobile;

// Detects mobile device.
function determineDevice() {
  if (navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i)) {
    isMobile = true;
  } else {
    isMobile = false;
  }
}

determineDevice();

// Queries database for articles and creates icons accordingly. The filter paramter refers to a category to filter articles (e.g. US, World, 
// Business, etc.). The searchInput parameter refers to search field input.
async function makeArticleIcons(filter, searchInput) {
  let promises = [];
  let q;
  let searchString;

  // If there is search input, set searchString to search input and query all articles.
  if (searchInput != undefined) {
    searchString = searchInput.toLowerCase();
    searchString = "*" + searchString + "*";
    q = query(collection(db, "Articles"));
  }

  // If there is no search input, create a searchString that matches everything
  else {
    searchString = "**";

    // Query articles in accordance with filter value
    if (filter == "All") {
      q = query(collection(db, "Articles"));
    }

    else {
      q = query(collection(db, "Articles"), where('Tags', 'array-contains', filter));
    }
  }


  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((article) => {

    // Fetch article title and check it against searchString using wildcard search
    let title = article.data().Title;
    title = title.toLowerCase();
    const wildcardPattern = searchString.replace(/\*/g, '.*');
    const regex = new RegExp(`^${wildcardPattern}$`);

    // If title matches pattern, make article object 
    if (regex.test(title)) {
      promises.push(
        new Promise(async (resolve, reject) => {
          try {
            const articleObject = new ArticleObject(
              article.data().URL,
              article.data().Title,
              article.data().IMG,
              article.data().Summary,
              article.data().Source,
              article.data().Date
            );
            resolve(articleObject);
          } catch (error) {
            reject(error);
          }
        })
      );
    }
  });

  // Return article objects.
  articleObjects = await Promise.all(promises);
}

//Function that returns App's page.
function App() {
  const [filter, setFilter] = useState("All");
  const [searchInput, setSearchInput] = useState();
  const [loaded, setLoaded] = useState(false);

  // Await article objects before page loads.
  useEffect(() => {
    async function fetchData() {
      await makeArticleIcons(filter, searchInput);
      setLoaded(true);
    }
    fetchData();

  }, [filter, loaded]);

  // Handle searches.
  const handleSubmit = (e) => {
    e.preventDefault();
    var input = e.target.search.value;
    if (input != undefined) {
      setLoaded(false);
      setFilter("All");
      setSearchInput(input);
    }
  };

  // Handle filters.
  function FilterArticles(filter) {
    setLoaded(false);
    setFilter(filter);
    setSearchInput();
  }


  while (!loaded) {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p className="CatchPhrase">
            News Across the Globe
          </p>
        </header>

        <form onSubmit={handleSubmit}>
          <input
            id="search"
            name="search"
            className="Search"
            type="text"
            placeholder="Search"
          />
          <MdOutlineCancel onClick={(e) => window.location.reload()} className="CancelSearch" />
        </form>
      </div>
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="CatchPhrase">
          News Across the Globe
        </p>
      </header>
      <form onSubmit={handleSubmit}>
        <input
          id="search"
          name="search"
          className="Search"
          type="text"
          placeholder="Search"
          defaultValue={searchInput}
        />
        <MdOutlineCancel onClick={(e) => window.location.reload()} className="CancelSearch" />
      </form>

      <div className="Categories" >

        <div className="flex align-items-center">
          <RadioButton value="All" filter="All" onClick={(e) => FilterArticles(e.value)} checked={filter === 'All'} />
          <label htmlFor="filter1" className="ml-2">All</label>
        </div>
        <div className="flex align-items-center">
          <RadioButton value="U.S." filter="U.S." onClick={(e) => FilterArticles(e.value)} checked={filter === 'U.S.'} />
          <label htmlFor="filter2" className="ml-2">U.S.</label>
        </div>
        <div className="flex align-items-center">
          <RadioButton value="World" filter="World" onClick={(e) => FilterArticles(e.value)} checked={filter === 'World'} />
          <label htmlFor="filter3" className="ml-2">World</label>
        </div>
        <div className="flex align-items-center">
          <RadioButton value="Business" filter="Business" onClick={(e) => FilterArticles(e.value)} checked={filter === 'Business'} />
          <label htmlFor="filter4" className="ml-2">Business</label>
        </div>
        <div className="flex align-items-center">
          <RadioButton value="Entertainment" filter="Entertainment" onClick={(e) => FilterArticles(e.value)} checked={filter === 'Entertainment'} />
          <label htmlFor="filter4" className="ml-2">Entertainment</label>
        </div>

      </div>
      <div className="Articles">

        {articleObjects.map((promise) => (
          <DropdownCard
            img={<img
              className="homephoto"
              src={promise.IMG}
              alt="article img"
            />}
            title={
              <p id="title">{promise.title}</p>

            }
            URL={
              <p id="URL">{promise.url}</p>
            }
            summary={
              <p id="summary">{promise.summary}</p>
            }
            source={promise.source}
            date={promise.date}
          />
        ))}
      </div>

    </div>
  );
}

export default App;
