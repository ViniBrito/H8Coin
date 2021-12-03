// SPDX-License-Identifier: WTFPL

pragma solidity >=0.7.0 <0.9.0;

/**
 * @title H8Coin
 * @dev Implements application process for H8 apartments
 */
contract H8Coin {
    struct Apartment {
        string apBlock;
        string apCode;
        uint8 numSpots;
        address[6] students;
    }

    struct Student {
        string name;
        string class;
        bool exists;
    }

    struct StudentInfo {
        string name;
        string class;
        uint16 score;
        bool isPresident;
        Apartment ap;
    }

    struct Initiative {
        uint8 id;
        string name;
        address president;
    }

    struct ScoreEntry {
        address student;
        uint8 initiativeId;
        uint16 score;
        uint16 semester;
    }

    address public owner;

    Student[] public students;
    Apartment[] public aps;
    Initiative[] public initiatives;
    ScoreEntry[] public scoreEntries;

    mapping(address => Student) public studentsMap;
    mapping(string => Apartment) public apsMap;
    mapping(address => ScoreEntry[]) public scoreMap;

    constructor() {
        owner = msg.sender;

        // Initialize with dummy data
        // FIXME: set the hardcoded addresses
        addStudent(address(0x1), "Fulano", "T22");
        addStudent(address(0x2), "Ciclano", "T22");
        addStudent(address(0x3), "Beltrano", "T23");
        addStudent(address(0x4), "Bixo", "T25");

        addAp("A", "101", 6);
        addAp("A", "102", 6);
        addAp("A", "103", 6);
        addAp("A", "104", 6);
        addAp("A", "105", 6);
        addAp("A", "131", 4);
        addAp("A", "132", 4);
        addAp("B", "210", 6);
        addAp("B", "211", 6);
        addAp("B", "212", 6);
        addAp("B", "213", 6);
    }

    /**
     * @dev Adds a student. Can only be called by the owner.
     * @param addr student address
     * @param name student name
     * @param class student class (e.g. "T22")
     */
    function addStudent(address addr, string memory name, string memory class) public {
        require(msg.sender == owner, "Not authorized.");

        Student memory student_ = Student({
            name: name,
            class: class,
            exists: true
        });
        students.push(student_);
        studentsMap[addr] = student_;
    }

    /**
     * @dev Adds an apartment. Can only be called by the owner.
     * @param apBlock e.g. "A"
     * @param apCode e.g. "114"
     * @param numSpots, typically either 4 or 6
     */
    function addAp(string memory apBlock, string memory apCode, uint8 numSpots) public {
        require(msg.sender == owner, "Not authorized.");

        Apartment memory ap_ = Apartment({
            apBlock: apBlock,
            apCode: apCode,
            numSpots: numSpots,
            students: [address(0), address(0), address(0), address(0), address(0), address(0)]
        });
        aps.push(ap_);
        apsMap[apCode] = ap_;
    }

    /**
     * @dev Returns info about ap with given code.
     * @param apCode e.g. "114"
     */
    function getApInfo(string memory apCode) public view returns (Apartment memory) {
        require(apsMap[apCode].numSpots > 0, "No such apartment.");
        return apsMap[apCode];
    }

    /**
     * @dev Returns a StudentInfo object with info about the caller.
     * Must be a valid student.
     */
    function getMyInfo() public view returns (StudentInfo memory) {
        require(studentsMap[msg.sender].exists, "Unknown address.");

        Apartment memory ap_;
        for (uint a = 0; a < aps.length; a++) {
            for (uint s = 0; s < aps[a].numSpots; s++) {
                if (aps[a].students[s] == msg.sender) {
                    ap_ = aps[a];
                }
            }

            if (ap_.numSpots > 0 /* found */) break;
        }

        return StudentInfo({
            name: studentsMap[msg.sender].name,
            class: studentsMap[msg.sender].class,
            score: getStudentScore(msg.sender),
            isPresident: isStudentPresident(msg.sender),
            ap: ap_
        });
    }

    /**
     * @dev Returns whether a student (address) is the president of an Initiative.
     */
    function isStudentPresident(address addr) public view returns (bool) {
        for (uint i = 0; i < initiatives.length; i++) {
            if (initiatives[i].president == addr) {
                return true;
            }
        }

        return false;
    }

    /**
     * @dev Returns current score for student.
     * @param addr student address
     */
    function getStudentScore(address addr) public view returns (uint16 score_) {
        for (uint s = 0; s < scoreMap[addr].length; s++) {
            score_ += scoreMap[addr][s].score;
        }
    }

    /**
     * @dev Returns all score entries for a given semester.
     * This is used by the app to prevent double assignment.
     * The caller must be a president.
     * @param semester encoded as 'YYYYN', e.g. 20211, 20212
     */
    function getScoreEntriesForMyInitiative(uint16 semester) public view
            returns (ScoreEntry[] memory entries_) {
        require(isStudentPresident(msg.sender), "Must be president to do this.");

        // Sadly we need to count before actually filtering
        uint numEntries = 0;
        for (uint i = 0; i < initiatives.length; i++) {
            if (initiatives[i].president == msg.sender) {
                for (uint s = 0; s < scoreEntries.length; s++) {
                    ScoreEntry memory entry = scoreEntries[s];
                    if (entry.initiativeId == initiatives[i].id
                        && entry.semester == semester) {
                        numEntries++;
                    }
                }

                break;
            }
        }

        entries_ = new ScoreEntry[](numEntries);

        for (uint i = 0; i < initiatives.length; i++) {
            if (initiatives[i].president == msg.sender) {
                for (uint s = 0; s < scoreEntries.length; s++) {
                    ScoreEntry memory entry = scoreEntries[s];
                    if (entry.initiativeId == initiatives[i].id
                        && entry.semester == semester) {
                        entries_[--numEntries] = entry;
                    }
                }

                break;
            }
        }
    }

    /**
     * @dev Assigns points to target. The caller must be a president.
     * Assigning points more than once in a single semester to the same
     * target is not allowed. The president shall not try to assign any
     * point to himself.
     * @param target student address
     * @param semester e.g. 20212
     * @param score must be either 5, 10 or 15
     */
    function assignScore(address target, uint16 semester, uint8 score) public {
        // TODO: semester needs proper validation
        require(target != msg.sender, "Cannot assign points to yourself.");
        require(score == 5 || score == 10 || score == 15, "Invalid score.");

        uint8 initiativeId = 0xFF;
        for (uint i = 0; i < initiatives.length; i++) {
            if (initiatives[i].president == msg.sender) {
                // Ensure no double assignment
                for (uint s = 0; s < scoreEntries.length; s++) {
                    if (scoreEntries[s].initiativeId == initiatives[i].id
                        && scoreEntries[s].semester == semester
                        && scoreEntries[s].student == target) {
                        require(false, "Attempt to double assign points.");
                    }
                }

                initiativeId = initiatives[i].id;
                break;
            }
        }

        require(initiativeId != 0xFF, "Must be president to do this.");

        ScoreEntry memory entry_ = ScoreEntry({
            student: target,
            initiativeId: initiativeId,
            score: score,
            semester: semester
        });
        scoreEntries.push(entry_);
        scoreMap[target].push(entry_);
    }

    /**
     * @dev Kick a student from their spot. The caller must be the owner.
     * @param target the student to kick
     */
    function kickStudent(address target) public {
        require(msg.sender == owner, "Not authorized.");

        for (uint a = 0; a < aps.length; a++) {
            for (uint s = 0; s < aps[a].numSpots; s++) {
                if (aps[a].students[s] == target) {
                    aps[a].students[s] = address(0);
                }
            }
        }
    }
}
