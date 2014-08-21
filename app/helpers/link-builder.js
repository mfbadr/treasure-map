'use strict';

exports.difficulty = function(dif){
  switch(dif){
    case 1:
      return 'Easy';
    case 2:
      return 'Medium';
    case 3:
      return 'Hard';
  }
};

exports.sort = function(query, name, display){
  var order = query.order ? query.order * -1 : 1,
        tag = query.tag ? '&tag=' + query.tag : '',
       link = '<a href="/treasures?sort=' + name + '&order=' + order + tag +'">'+display+'</a>';
  return link;
};
