var links = [];

function  createNewLink(titel, url, sender)
{
    links.push({id :links.length, titel: titel, url : url, ranking: 0,sender : sender, Date : new Date() });
}

function getAllLinks(){
    return links;
}

function getLink(id){
    return notes[id];
}

module.exports = {createNewLink : createNewLink, getAllLinks : getAllLinks, getLink : getLink};
 
