// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract NewsContract {
    struct News {
        string id;
        string title;
        string content;
        string createdAt;
        string updatedAt;
        string publisher;
    }

    bool public checkRunning = true;
    News[] public news;
    event NewsPublish(string id, string title, string content, string createdAt, string updatedAt, string publisher);

    function publish(
        string memory id,
        string memory title,
        string memory content,
        string memory createdAt,
        string memory updatedAt,
        string memory publisher
    ) external {
        news.push(News(id, title, content, createdAt, updatedAt, publisher));
        emit NewsPublish(id, title, content, createdAt, updatedAt, publisher);
    }
}
