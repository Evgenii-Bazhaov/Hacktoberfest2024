// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract VotingContract {
    struct Candidate {
        string name;
        uint16 votes;
    }

    bool public checkRunning = true;
    Candidate[] public candidates;
    event VoteCast(uint256 candidateId, uint256 votes);

    constructor(string[] memory initialCandidates) {
        for (uint16 i = 0; i < initialCandidates.length; i++) {
            candidates.push(Candidate(initialCandidates[i], 0));
        }
    }

    function vote(uint16 index) external {
        require(index < candidates.length, "Invalid candidate ID");

        candidates[index].votes += 1;

        emit VoteCast(index, candidates[index].votes);
    }

    function getCandidate(uint16 index) external view returns (string memory name, uint256 votes) {
        require(index < candidates.length, "Invalid candidate ID");

        Candidate storage candidate = candidates[index];
        return (candidate.name, candidate.votes);
    }

}