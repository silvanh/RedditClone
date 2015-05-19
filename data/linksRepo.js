var links = [];
var pattern = new RegExp('https?://.+');
var linkId = -1;

function createNewLink(title, url, sender)
{
   if(pattern.test(url)){
      links.push({id : ++linkId, title: title, url : url, ranking: 0, sender : sender, date : new Date().toLocaleDateString() });
   }
}

function getAllLinks(){
  links.sort(function(a, b) { 
   if(a.ranking > b.ranking) {
      return -1;
    }
    if (a.ranking < b.ranking) {
      return 1;
    }
    return 0;
  });
  return links;
}

function findIndex(id) {
  var i= 0;
  while(links[i].id!==id){
      ++i;
  }
  return i;
}

function getLink(id){
  return links[findIndex(id)];
}

function deleteLink(id){
  links.splice(findIndex(id),1);
}

function upVote(id){
  links[findIndex(id)].ranking+=1;
}

function downVote(id){
  links[findIndex(id)].ranking-=1;
 }

module.exports = {createNewLink : createNewLink, getAllLinks : getAllLinks, getLink : getLink, deleteLink : deleteLink, upVote : upVote, downVote : downVote};
 
