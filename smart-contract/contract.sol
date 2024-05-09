// SPDX-License-Identifier: MIT

pragma solidity ^ 0.8.0;

contract UniversityDegrees {
    
    // DATA STRUCTURES
    enum QualificationType {
        DEGREE,
        CERTIFICATE,
        HONOR
    }

    struct Qualification {
        string name;
        string description;
        address issuedBy;
        uint256 issueDate;
        QualificationType qualificationType;
    }

    mapping(address => Qualification[]) private studentQualifications;
    address[] public universities;
    mapping(address => string) private studentNames;
    address[] waitingRegistration;
    mapping(address => mapping(address => int)) votes;

    // MODIFIER
    modifier onlyRegisteredUniversity() {
        bool isRegistered = false;
        for(uint i = 0; i < universities.length; i++) {
            if(universities[i] == msg.sender) {
                isRegistered = true;
                break;
            }
        }
        require(isRegistered, "Caller is not a registered university.");
        _;
    }

    constructor() {
        universities.push(msg.sender);
    }

    function registerUniversity(address _university) public onlyRegisteredUniversity {
        universities.push(_university);
    }

    function addQualification(
        address _student,
        string calldata _name,
        string calldata _description,
        QualificationType _qualificationType
    ) public onlyRegisteredUniversity {
        studentQualifications[_student].push(Qualification({
            name: _name,
            description: _description,
            issuedBy: msg.sender,
            issueDate: block.timestamp,
            qualificationType: _qualificationType
        }));
    }

    function getQualifications(address _student) public view returns (Qualification[] memory) {
        return studentQualifications[_student];
    }

    function addName(string calldata _fullname) public {
        studentNames[msg.sender] = _fullname;
    }

    function getName(address _student) public view returns (string memory){
        return studentNames[_student];
    }

    function applyToBeRegistered() public {      
        // Check if the caller is already registered
        bool isRegistered = isRegisteredUniversity(msg.sender);
        require(!isRegistered, "Caller is already a registered university");

        // Check if the caller is already in the waiting list
        bool isWaiting = isWaitingRegistration(msg.sender);
        require(!isWaiting, "Caller is already waiting to be registered");

        // Add caller to waiting registration list
        waitingRegistration.push(msg.sender);
    }

    function getApplicants() public view returns (address[] memory) {
        return waitingRegistration;
    }

    function getApplicantsFilteredForVoter(address _voter) public view returns (address[] memory) {
        address[] memory filteredApplicants = new address[](waitingRegistration.length);
        uint count = 0;
    
        for (uint i = 0; i < waitingRegistration.length; i++) {
            address applicant = waitingRegistration[i];

            int voteStatus = votes[applicant][_voter];
            if (voteStatus == 0) {
                filteredApplicants[count] = applicant;
                count++;
            }
        }

        address[] memory finalList = new address[](count);
        for (uint i = 0; i < count; i++) {
            finalList[i] = filteredApplicants[i];
        }
    
        return finalList;
    }


    function vote(address _applicant, string calldata _vote) public onlyRegisteredUniversity {
        // Check if the caller is already in the waiting list
        bool isWaiting = isWaitingRegistration(_applicant);
        require(isWaiting, "Address is not waiting to be registered");

        //FIXME Check if either a Y or N is passed
        bool isVote = keccak256(abi.encodePacked(_vote)) == keccak256(abi.encodePacked("Y")) ||
                      keccak256(abi.encodePacked(_vote)) == keccak256(abi.encodePacked("N"));
        require(isVote, "Invalid vote. Please use 'Y' for yes or 'N' for no");

        if (keccak256(abi.encodePacked(_vote)) == keccak256(abi.encodePacked("Y"))) {
            votes[_applicant][msg.sender] = 1; // 1 for yes
        } else if (keccak256(abi.encodePacked(_vote)) == keccak256(abi.encodePacked("N"))) {
            votes[_applicant][msg.sender] = 2; // 2 for no
        }

        // Check if everyone has voted for this address
        if (getVoterCount(_applicant) == universities.length) {
            // If so, make a decision
            decide(_applicant);
        }
    }
    
    function getVoterDistribution(address _applicant) public view onlyRegisteredUniversity returns (uint[2] memory) {
        uint y = 0;
        uint n = 0;
        for(uint i = 0; i < universities.length; i++) {
            if (votes[_applicant][universities[i]] == 1) {
                y++; // yes
            }
            else if (votes[_applicant][universities[i]] == 2) {
                n++; // no
            }
        }
        return [y, n];
    }

    function getVoterCount(address _applicant) public view onlyRegisteredUniversity returns (uint) {
        uint hasVoted = 0;
        for(uint i = 0; i < universities.length; i++) {
            if (votes[_applicant][universities[i]] == 1 || votes[_applicant][universities[i]] == 2) {
                hasVoted++; 
            }
        }
        return hasVoted;
    }

    function decide(address _applicant) private {
        uint[2] memory results = getVoterDistribution(_applicant);
        uint y = results[0];
        uint n = results[1];

        if (y > n) {
            // APPROVE
            registerUniversity(_applicant);
        }

        // Remove address from applicants
        //removeAddressFromWaiting(_applicant);
    }

    // HELPER METHODS
    function isRegisteredUniversity(address _user) public view returns (bool) {
        bool isRegistered = false;
        for(uint i = 0; i < universities.length; i++) {
            if(universities[i] == _user) {
                isRegistered = true;
                break;
            }
        }
        return isRegistered;
    }

    function isWaitingRegistration(address _user) private view returns (bool) {
        bool isWaiting = false;
        for(uint i = 0; i < waitingRegistration.length; i++) {
            if(waitingRegistration[i] == _user) {
                isWaiting = true;
                break;
            }
        }
        return isWaiting;
    }

    function removeAddressFromWaiting(address _user) private {
        // Find the index
        uint index = waitingRegistration.length;
        for (uint i = 0; i < waitingRegistration.length; i++) {
            if(waitingRegistration[i] == _user) {
                index = i;
                break;
            }
        }
        // Make sure index is found
        if (index == waitingRegistration.length)
            return;
        // Move all elements after index one place to the left
        for (uint i = index; i < waitingRegistration.length - 1; i++) {
            waitingRegistration[i] = waitingRegistration[i+1];
        }
        // Delete final element
        waitingRegistration.pop();
    }
}