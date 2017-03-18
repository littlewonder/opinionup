Questions = new Mongo.Collection('questions');

Template.questionlist.helpers({
    items: function(){
        return Questions.find({},{sort:{dateAdded:-1}});
    }
});

Template.singlequestion.events({
    'click' :function(){
        Session.set('clicked',this._id);
    },
    'click #removeitem': function(event){
        event.preventDefault();
        if(Meteor.userId()){
        let qid = Session.get('clicked');
        Meteor.call('rm',qid);
        }
    },
    'click #agree': function(event){
        event.preventDefault();
        if(Meteor.userId()){
        let qid = Session.get('clicked');
        Meteor.call('incvote',qid);
        }else{
              document.getElementById("modal1").style.display="block";
        }
    },
    'click #disagree': function(event){
        if(status === 0){
        if(Meteor.userId()){
        let qid = Session.get('clicked');
        Meteor.call('decvote',qid);
    }else{
              document.getElementById("modal1").style.display="block";
        }
    }
    }
});
 

Template.addquestion.events({ 
    'submit form': function(event) { 
        event.preventDefault();
        let questiontext = event.target.question.value;
        Meteor.call("addquestion",questiontext);
        event.target.question.value = "";
    } 
}); 


Template.error.events({
    'click #closeerror' : function(event){
        event.preventDefault();
        document.getElementById("modal1").style.display="none";
    }
});