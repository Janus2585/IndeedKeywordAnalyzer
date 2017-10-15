import React, { Component } from 'react';
import logo from './logo.svg';
import $ from 'jquery';
import './App.css';

class App extends Component {
  
  constructor(props){
        super(props);
        this.getKeywords=this.getKeywords.bind(this);
    }
  
     
  

  getKeywords() {

    function getIndicesOf(searchStr, str) {
      var searchStrLen = searchStr.length;
      if (searchStrLen == 0) {
          return [];
      }
      var startIndex = 0, index, indices = [];

      while ((index = str.indexOf(searchStr, startIndex)) > -1) {
          indices.push(index);
          startIndex = index + searchStrLen;
      }
      return indices;
    }

    function convertStringToElements(html) {
      return $(html);
    }


    $.ajax({ url: 'https://www.indeed.com/q-Web-Developer-jobs.html', 
      success: function(sourceHTML) { 
        
        var elements = convertStringToElements(sourceHTML);
        var foundElements = $('.jobtitle', elements).splice(3, 10);

        //foundElements is an object of all the job postings on that page
        //for each listing, the href needs to be found 
        var hrefList = [];
        foundElements.map(foundElement => 
          hrefList.push(foundElement.firstElementChild.href));
        
        //these hrefs have localhost:3000 appended to them. this needs to be replaced with indeed.com
        var processedHrefs = [];
        for (var i = 0; i < hrefList.length; i++) { 
            processedHrefs[i] = hrefList[i].replace("http://localhost:3000", "http://www.indeed.com");
        }



        //some of the links redirect to a company website instead of an indeed posting. these sites must be ignored.

        var indeedHrefs = [];
        for (var i = 0; i < processedHrefs.length; i++) { 
            if (processedHrefs[i].indexOf('indeed.com/rc') == -1){
              indeedHrefs.push(processedHrefs[i]);
            }
        }

        console.log(indeedHrefs + 'indeed hrefs');
        
        //Declare the keywords to search job postings for
        //Later these need to be changed to account for variations in the name (ex. GitHub and Github, React and React.js, etc)
        var keywords = ['HTML', 'CSS', 'Javascript', 'React', 'Github', 'Responsive', 'SEO', 'iOS', 'Android', 'jQuery'];
        var keywordCounter = [];
        keywordCounter.length = keywords.length;
        keywordCounter.fill(0);
        console.log(keywordCounter + 'keyword counter before use');
        //now the indeed job posting links on the page have been found. Get the HTML of each one

        var jobSummaryTextArray = [];

        for (var i = 0; i < indeedHrefs.length; i++) {
          $.ajax({ url: indeedHrefs[i], 
            success: function(jobHTML) { 
              var jobElements = convertStringToElements(jobHTML);
              var jobSummaryObject = $('.summary', jobElements)
              var jobSummaryText = jobSummaryObject[0].innerText
              console.log(jobSummaryTextArray + 'jobSummaryText array');
              for (var j = 0; j < keywords.length; j++) {
                if (jobSummaryText.search(keywords[j]) != -1) {
                  keywordCounter[j] += 1;
                  console.log(keywordCounter + ' keyword counter after increment');
                }
              }
            }
          })
        };

        setTimeout(function() {console.log(keywordCounter + 'keyword counter AfTER');}, 1000)
        


        //var beginningOfJobPosting = sourceHTML.search("row  result"); 
        //console.log(beginningOfJobPosting);
        
        //var myIndices = getIndicesOf("row  result", sourceHTML);
        //console.log(myIndices);

        
    } });
  }

  

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          <a href="#" onClick={this.getKeywords}>Click here to get keywords</a>
        </p>
      </div>
    );
  }
}

export default App;
