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

function getLink(id){
  var i= 0;
  while(links[i].id!==id){
      ++i;
  }
  return links[i];
}

function deleteLink(id){
  var i= 0;
  while(links[i].id!==id){
      ++i;
  }
  links.splice(i,1);
}

function upVote(id){
  var i= 0;
  while(links[i].id!==id){
      ++i;
  }
  links[i].ranking+=1;

}

function downVote(id){
  var i= 0;
  while(links[i].id!==id){
      ++i;
  }
  links[i].ranking-=1;
 }

module.exports = {createNewLink : createNewLink, getAllLinks : getAllLinks, getLink : getLink, deleteLink : deleteLink, upVote : upVote, downVote : downVote};
 
