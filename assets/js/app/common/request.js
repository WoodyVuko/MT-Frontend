module.exports = ['$resource', '$http', 'CommonConfig', function($resource, $http, CommonConfig) {
  'use strict';

  var generateResource = function(route, endpoint, paramDefaults, actions, options) {
    if (actions) {
      angular.forEach(actions, function(action) {
        action.url = CommonConfig.endpoints[endpoint][CommonConfig.environment()] + action.url;
      });
    }

    return $resource((endpoint ? CommonConfig.endpoints[endpoint][CommonConfig.environment()] : '/')  + route, paramDefaults, actions, options);
  };

  return {
    users : generateResource('users', 'backend', null, {
      // die standard operationen (get post put delete) werden automatisch erzeugt
      getTokenByLogin : {
        method : 'POST',
        url : 'users/authenticate/'
      },
      getAll : {
        method : 'GET',
        url : 'users/',
        cache: true
      },
      getUserById : {
        method : 'GET',
        url : 'users/:userId'
      },
      addUser : {
        method : 'POST',
        url : 'users/register/'
      },
      changeProfile : {
        method : 'PUT',
        url : 'users/:userId'
      },
    }),
    articles : generateResource('article', 'backend', null, {
      // die standard operationen (get post put delete) werden automatisch erzeugt
      getArticleById : {
        method : 'GET',
        url : 'article/:articleId'
      },
      getAll : {
        method : 'GET',
        url : 'article/',
        cache: true
      },
      addArticle : {
        method : 'POST',
        url : 'article/add/'
      },
      changeArticle : {
        method: 'PUT',
        url: 'article/:articleId'
      }
    }),
    allergics : generateResource('allergic', 'backend', null, {
      // die standard operationen (get post put delete) werden automatisch erzeugt
      getAllergicById : {
        method : 'GET',
        url : 'allergics//:allergicId'
      },
      getAll : {
        method : 'GET',
        url : 'allergics/',
        cache: true
      },
      addAllergic : {
        method : 'POST',
        url : 'allergics/add/'
      },
      changeArticle : {
        method: 'PUT',
        url: 'allergics//:allergicId'
      }
    })
    // articles : generateResource('articles', 'backend', null, {
    //   getUserById : {
    //     method : 'POST',
    //     url : 'articles/add/:articleId'
    //   }
    // })
  };
}];
