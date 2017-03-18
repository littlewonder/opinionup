Questions = new Mongo.Collection('questions');

Meteor.methods({
  addquestion: function(questiontext){
  let questionid = Questions.insert({
    'questionAdded' : questiontext,
    'dateAdded' : new Date(),
    'addedBy' : Meteor.userId(),
    'yes': 0,
    'no': 0
  });
  return questionid;
},
   incvote: function(qid){
     if(Meteor.userId()){
        Questions.update(qid,{$inc:{'yes':1}});
    }
  }
,
    decvote: function(qid){
      if(Meteor.userId()){
        Questions.update(qid,{$inc:{'no':1}});
    }
  },
    rm:function(qid){
      if(Meteor.userId()){
         Questions.remove(qid);
    }
}
});
