module.exports = [
    'CommonRequest',
    function(
        CommonRequest
    ) {
        'use strict';
        var self = this;
        var simpleStorage = require('simpleStorage.js');

        self.customers = [
        {
            'id' : '1',
            'name' : '1'
        },
        {
            'id' : '2',
            'name' : '2'
        },
        {
            'id' : '3',
            'name' : '3'
        },
    ]


    self.getAll = function () {
        CommonRequest.groups.getAll({
            'x-access-token' : simpleStorage.get('secToken')

        },  {}, function(response) {
            if (response && response.message) {
                self.list = response.message;
                console.log('self.getAll wird ausgeführt');
            }
        }, function(response) {
            console.log('error', response);
        });
    };

        self.getArticles = function () {
            CommonRequest.mobile.getArticlesViaGroup({
                'id': simpleStorage.get('tempGroupID')
            },  {
                'x-access-token' : simpleStorage.get('secToken'),
                'userid' : '57699490e8be70ec09ab94d6'
            }, function(response) {
                if (response && response.message) {
                    self.list = response.message;
                    //self.listID = response.message.id;
                    console.log('self.getArticlesViaGroup wird ausgeführt');
                }
            }, function(response) {
                console.log('error', response);
            });
        };

        self.saveGroupTempID = function(tempID, tempName)
        {
            simpleStorage.set('tempGroupName', tempName, {TTL: 100000});
            simpleStorage.set('tempGroupID', tempID, {TTL: 100000});
            self.getArticles();
        }

        self.getID = function()
        {
            return simpleStorage.get('tempGroupID')
        }
        
        self.getName = function()
        {
            return simpleStorage.get('tempGroupName')
        }

        self.getById = function () {
            CommonRequest.mobile.getArticleViaId({
                'id' : simpleStorage.get('tempArticleID')

            },  {
                'x-access-token' : simpleStorage.get('secToken'),
                'userid' : '57699490e8be70ec09ab94d6'


            }, function(response) {

                self.newArticle = response.message[0];

                console.log('article.getArticleById wird ausgeführt');

            }, function(response) {
                console.log('error', response);
            });
        };

        
        self.getArticleID = function()
        {
            return simpleStorage.get('tempArticleID');
        }
        self.saveArticleTempID = function(tempID)
        {
            simpleStorage.set('tempArticleID', tempID, {TTL: 100000});
            console.log("Gespeicherte Daten: ," , simpleStorage.get
            ("tempArticleID"));
        }
        
        self.test = function(id){
            console.log("ID:", id);
        }
}];
