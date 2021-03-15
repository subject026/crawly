const axios = require("axios");
const cheerio = require('cheerio');

const store = require("./model/store");
const processPage = require("./processPage");

async function getInitialPage(url) {
  // get initial page & make sure url works
  if (!url.match(/http:\/\//)) url = 'http://' + url;

  const urlSplit = url.split("/")
  const domain = urlSplit.slice(2, 3).join("");
  console.log("\n\n")
  console.log(domain)
  console.log("\n\n")
  // fill uncrawled
  let initialres;
  try {
    initialres = await axios.get(url);
  } catch (err) {
    console.log(err)
  }
  return initialres;
}

async function crawl(url) {  
  const initialres = await getInitialPage(url);
  processPage(initialres);     
  
  while (store.getState().status !== "COMPLETE") {
      try {        
        //
        // all done!
        store.dispatch({
          type: "SET_STATUS",
          payload: "COMPLETE"
        })
      } catch (err) {    
        console.log(err.message)
        return false;
      }
      crawlComplete = store.getState().status;
      console.log("crawlComplete: ", crawlComplete)
    }
    
    return store.getState();
  }

module.exports = crawl;