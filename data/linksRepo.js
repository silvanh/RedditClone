var links = [];

function  createNewLink(title, url, sender)
{
    links.push({id :links.length, title: title, url : url, ranking: 0, sender : sender, date : new Date() });
}

function getAllLinks(){
    return links;
}

function getLink(id){
    return links[id];
}

function deleteLink(id){
    var i= 0;
    while(links[i].id!==id){
        ++i;
    }
  links.splice(i,1);
}

function upVote(link){
  link.ranking+=1;

}

function downVote(link){
    link.ranking-=1;
 }

module.exports = {createNewLink : createNewLink, getAllLinks : getAllLinks, getLink : getLink, deleteLink : deleteLink, upVote : upVote, downVote : downVote};
 
