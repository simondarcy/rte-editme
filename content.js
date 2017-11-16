/* rte edit me main content script */

/* globals */
var binderid = null;
var defaultindexid = null;
var rteRegex = /^http[s]?:\/\/(?:[^\.]+\.)?rte\.ie/;
var playerRegex =  /\/player\/ie\/show\/\d+/;

//Open RTÉ CMS in Edit mode for the current article.
function openEpic() {
    //Get all meta info
    metaCollection = document.getElementsByTagName('meta');

    //Get ID and Index ID
    for (i=0; i<metaCollection.length; i++) {

        if(metaCollection[i].name == 'DC.identifier'){
            binderid = metaCollection[i].content.substring(9);
        }
        if(metaCollection[i].name == 'DC.isPartOf'){
            //console.log(metaCollection[i].content.substring(9));
            defaultindexid = metaCollection[i].content.substring(9);
        }

    }

    //Validation
    if(binderid == null || defaultindexid == null){
        alert('Oops! Invalid URL');
    }
    else{
        //Select which env to open based on host
        if ( document.location.host == "djnext.rte.ie"){
            url ='https://epicnext.rte.ie/EpicNext/Binder/Edit/'+defaultindexid+'/'+binderid+'?mode=0';
        }
        else if ( document.location.host == "djdev.rte.ie"){
            url ='https://epicdev.rte.ie/EpicDev/Binder/Edit/'+defaultindexid+'/'+binderid+'?mode=0';
        }
        else{
            url ='https://epic.rte.ie/epic/Binder/Edit/'+defaultindexid+'/'+binderid+'?mode=0';
        }
        window.open(url);

    }
}


//Open Page on website
function openRTE() {
    /* replace this with meta tag */
    url = document.getElementsByClassName('optionsLabelWide')[1].getElementsByClassName('optionsInfoItem')[1].getElementsByTagName('a')[0].href;
    window.open(url);
}

//Open player show
function openPlayer(){
    url = 'http://www.rte.ie/player/ie/show/' + window.location.pathname.split('/Indexing/Edit/')[1];
    window.open(url);
}

//Open AV CMS
function openClipper(){
    url = 'http://clipper.rte.ie/Indexing/Edit/' + window.location.pathname.split('/show/')[1];
    window.open(url);
}

/* Listen for messages */
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {

    /* If the received message has the expected format... */
    if (msg.text && (msg.text == "report_back")) {
        url = document.location.href;
        //has to be rte domain
        if( rteRegex.test( url ) ){
            //if player programme
            if( playerRegex.test( url ) ){
                openClipper();
            }
            //if web article open it in epic
            else if (document.location.host == 'www.rte.ie' || document.location.host == 'beta.rte.ie' || document.location.host == 'djnext.rte.ie' || document.location.host == 'djdev.rte.ie')
            {
                openEpic();
            }
            else if (document.location.host == 'epic.rte.ie' || document.location.host == 'epicnext.rte.ie' || document.location.host == 'epicdev.rte.ie' )
            {
                openRTE();
            }
            else if (document.location.host == 'clipper.rte.ie' || document.location.host == 'clippernext.rte.ie')
            {
                openPlayer();
            }

            //else if clipper open player
        }

        else{
            alert('not an rte url');
        }

        /* Call the specified callback, passing the web-pages DOM content as argument */
        //sendResponse( 'Success' );
    }
});