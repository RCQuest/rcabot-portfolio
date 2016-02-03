angular.module('rcabot',['jtt_tumblr'])
.controller('TumblrInjectCtrl',function($scope,tumblrFactory){
	tumblrFactory.getPostsFromPage(
	{
	    page:"rcabot",
	    limit:"10",
	    type:"photo",
	    api_key:"CoEhy45MfSrTSm2qYAp2tVXESUAHBRMsNnxrnhU9x5jiyZCVJ4"
	}).then(function (_data) {
	    $scope.tumblrPosts=_data.data.response.posts;
	    console.log(_data);
	}).catch(function (_data) {
	    console.log(_data);
	});
});