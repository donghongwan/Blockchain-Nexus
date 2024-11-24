// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EventOracle {
    struct Event {
        string description;
        uint256 timestamp;
        bool isTriggered;
    }

    mapping(uint256 => Event) public events;
    uint256 public eventCount;

    event EventTriggered(uint256 indexed eventId, string description);

    function createEvent(string memory description) public {
        eventCount++;
        events[eventCount] = Event(description, block.timestamp, false);
    }

    function triggerEvent(uint256 eventId) public {
        Event storage eventToTrigger = events[eventId];
        require(!eventToTrigger.isTriggered, "Event already triggered");
        eventToTrigger.isTriggered = true;
        emit EventTriggered(eventId, eventToTrigger.description);
    }

    function getEvent(uint256 eventId) public view returns (string memory, uint256, bool) {
        Event memory eventToReturn = events[eventId];
        return (eventToReturn.description, eventToReturn.timestamp, eventToReturn.isTriggered);
    }
}
