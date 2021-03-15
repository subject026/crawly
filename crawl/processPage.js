const store = require("./model/store")

module.exports = function(pagedata) {
  try {               
    const $ = cheerio.load(pagedata);
    const links = $('body').find("a");
    
    console.log("\n\n", store.getState(), "\n\n")
    // add page links to uncrawled

    // if link starts with "/"

    // if page starts with domain
    // if page starts with https://domain
    links.each((i, link) => {
      store.dispatch({
        type: "ADD_LINK",
        payload: link.attribs.href 
      })          
    });  
    
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
  // get all links


  // determine full hostname if 
  

  // standardise links

  // add each link to page data
  // -> for each link
    // determine whether internal or external
    // check whether link has already been crawled
    // add internal links to crawl list
}