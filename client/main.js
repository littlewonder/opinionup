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
        let qid = Session.get('clicked');
        Meteor.call('rm',qid);
    },
    'click #agree': function(event){
        event.preventDefault();
        let qid = Session.get('clicked');
        Meteor.call('incvote',qid);
    },
    'click #disagree': function(event){
        event.preventDefault();
        let qid = Session.get('clicked');
        Meteor.call('decvote',qid);
    }
});


Template.addquestion.helpers({ 
    create: function() { 
         
    }, 
    rendered: function() { 
         
    }, 
    destroyed: function() { 
         
    }, 
}); 

Template.addquestion.events({ 
    'submit form': function(event) { 
        event.preventDefault();
        let questiontext = event.target.question.value;
        Meteor.call("addquestion",questiontext);
        event.target.question.value = "";
    } 
}); 
