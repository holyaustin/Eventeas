pragma solidity ^0.8.0;

contract TwitterClone {
    struct Tweet {
        string text;
        uint256 timestamp;
        uint256 likes;
        uint256 retweets;
    }

    struct User {
        string username;
        Tweet[] tweets;
    }

    mapping(address => User) public users;
    mapping(address => address[]) public followers;

    function createTweet(string memory _text) public {
        Tweet memory newTweet = Tweet(_text, block.timestamp, 0, 0);
        users[msg.sender].tweets.push(newTweet);
    }

    function followUser(address _userAddress) public {
        followers[_userAddress].push(msg.sender);
    }

    function likeTweet(address _userAddress, uint256 _tweetIndex) public {
        users[_userAddress].tweets[_tweetIndex].likes++;
    }

    function retweet(address _userAddress, uint256 _tweetIndex, string memory _text) public {
        Tweet memory originalTweet = users[_userAddress].tweets[_tweetIndex];
        Tweet memory newTweet = Tweet(_text, block.timestamp, 0, 0);
        newTweet.retweets = originalTweet.retweets + 1;
        users[msg.sender].tweets.push(newTweet);
    }
}