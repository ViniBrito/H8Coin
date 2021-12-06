// SPDX-License-Identifier: WTFPL

/*
Deployed at: 0x500424ddE53558FA4e7952843d9013013622dEfE
Cohab address: 0x641AeAaab0b7b8bbCE400c8DeeFA0aB03af2F076

Hardcoded data on constructor:

- Initiatives:
    ITA Bits, 0x4B2b6157f5fFB69261aFA5e2d7255498050CA9c2

- Aps (apBlock, apCode, numSpots):
    A 101 6
    A 102 6
    A 103 6
    B 240 4
    B 241 4

- Students:
    Fulano, 2018, 0x4B2b6157f5fFB69261aFA5e2d7255498050CA9c2, 101 C, ITA Bits
    Ciclano, 2018, 0xA84077dF2d44B28296A2A6cA3a5736FF4F6382be, 240 A, not president
    Juliano, 2019, 0xDE37B3B1eaB580Fb247E1D0CC544AAB23Eb15ecc, 240 B, not president
*/

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
        uint16 year;
        bool exists;
        bool president;
        string apCode;
    }

    struct StudentInfo {
        string name;
        uint16 year;
        uint16 score;
        bool president;
        string apCode;
    }

    struct Initiative {
        string name;
        address president;
    }

    struct ScoreEntry {
        address student;
        string initiative;
        uint16 score;
        uint16 semester;
    }

    struct Cohab {
        address director;
    }

    Initiative[] public initiatives;
    Cohab public cohab;

    address constant public noAdd = 0x0000000000000000000000000000000000000000;

    constructor() {
        cohab.director = msg.sender;

        addInitiative("ITA Bits", 0x4B2b6157f5fFB69261aFA5e2d7255498050CA9c2);

        addAp("A", "101", 6);
        addAp("A", "102", 6);
        addAp("A", "103", 6);
        addAp("B", "240", 4);
        addAp("B", "241", 4);

        addStudent(0x4B2b6157f5fFB69261aFA5e2d7255498050CA9c2, "Fulano", 2018, true, "101", 2);
        addStudent(0xA84077dF2d44B28296A2A6cA3a5736FF4F6382be, "Ciclano", 2018, true, "240", 0);
        addStudent(0xDE37B3B1eaB580Fb247E1D0CC544AAB23Eb15ecc, "Juliano", 2019, true, "240", 1);
    }

    mapping(address => Student) public studentsMap;
    mapping(string => Apartment) public apsMap;
    mapping(address => ScoreEntry[]) public scoreMap;
    mapping(string => mapping(uint16 => ScoreEntry[])) public assigmentMap;

    function defineCohab(address addr) public {
        require(isCohab(addr), "Not authorized.");
        cohab.director = addr;
    }

    /**
     * @dev Adds a student. Can only be called by cohab.
     * @param addr student address
     * @param name student name
     * @param year student year (e.g. 2018)
     * @param apCode student ap (e.g. "201")
     */
    function addStudent(address addr, string memory name, uint16 year,
                        bool president, string memory apCode, uint pos) public {
        require(msg.sender == cohab.director, "Not authorized.");
        Student memory student_ = Student({
            name: name,
            year: year,
            exists: true,
            president: president,
            apCode: apCode
        });
        studentsMap[addr] = student_;

        assignApStudent(addr, apCode, pos);
    }

    /**
     * @dev Adds an apartment. Can only be called by cohab.
     * @param apBlock e.g. "A"
     * @param apCode e.g. "114"
     * @param numSpots, typically either 4 or 6
     */
    function addAp(string memory apBlock, string memory apCode, uint8 numSpots) public {
        require(msg.sender == cohab.director, "Not authorized.");
        Apartment memory ap_ = Apartment({
            apBlock: apBlock,
            apCode: apCode,
            numSpots: numSpots,
            students: [noAdd, noAdd, noAdd, noAdd, noAdd, noAdd]
        });
        apsMap[apCode] = ap_;
    }

    function addInitiative(string memory name, address president) public {
        require(isCohab(msg.sender), "Must be Cohab to do this");

        Initiative memory ini_ = Initiative({
            name: name,
            president: president
        });

        initiatives.push(ini_);
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

        return StudentInfo({
            name: studentsMap[msg.sender].name,
            year: studentsMap[msg.sender].year,
            score: getStudentScore(msg.sender),
            president: studentsMap[msg.sender].president,
            apCode: studentsMap[msg.sender].apCode
        });
    }

    function getPointsInfo() public view returns (ScoreEntry[] memory) {
        require(studentsMap[msg.sender].exists, "Unknown address.");
        return scoreMap[msg.sender];
    }

    /**
     * @dev Returns whether a student (address) is the president of an initiative.
     */
    function isStudentPresident(address addr) public view returns (bool) {
        return studentsMap[addr].president;
    }

    function isCohab(address addr) public view returns (bool) {
        return cohab.director == addr;
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

    function myInitiative(address addr) public view returns (string memory name) {
        for (uint i = 0; i < initiatives.length; i++) {
            if (initiatives[i].president == addr ) {
                name = initiatives[i].name;
            }
        }
    }

    /**
     * @dev Returns all score entries for a given semester.
     * This is used by the app to prevent double assignment.
     * The caller needs not be a president as this is public info.
     * @param semester encoded as 'YYYYN', e.g. 20211, 20212
     */
    function getScoreEntriesForInitiative(uint16 semester, string memory initiative) public view
            returns (ScoreEntry[] memory entries) {
        entries = assigmentMap[initiative][semester];
    }

    /**
     * @dev Assigns points to target. The caller must be a president.
     * Assigning points more than once in a single semester to the same
     * target is not allowed. The president shall not try to assign any
     * point to himself.
     * @param target student address
     * @param semester e.g. 20212
     * @param score must be either 5, 10, 15, 20 or 30
     */
    function assignScore(address target, uint16 semester, uint8 score) public {
        // TODO: semester needs proper validation
        require(score == 5 || score == 10 || score == 15 || score == 20 || score == 30, "Invalid score.");

        require(studentsMap[msg.sender].president, "Must be president to do this.");
        string memory initiative = myInitiative(msg.sender);

        // Ensure no double assignment
        ScoreEntry[] memory entries = getScoreEntriesForInitiative(semester, initiative);
        for (uint s = 0; s < entries.length; s++) {
            if (entries[s].semester == semester && entries[s].student == target) {
                require(false, "Attempt to double assign points.");
            }
        }

        ScoreEntry memory entry_ = ScoreEntry({
            student: target,
            initiative: initiative,
            score: score,
            semester: semester
        });
        scoreMap[target].push(entry_);
        assigmentMap[initiative][semester].push(entry_);
    }

    /**
     * @dev Kick a student from their spot. The caller must be cohab.
     * @param target the student to kick
     */
    function kickStudent(address target) public {
        require(msg.sender == cohab.director, "Not authorized.");

        Student memory aux = studentsMap[target];

        for (uint s = 0; s < apsMap[aux.apCode].numSpots; s++) {
            if (apsMap[aux.apCode].students[s] == target) {
                apsMap[aux.apCode].students[s] = noAdd;
            }
        }

        studentsMap[target].apCode = "";
    }

    function assignApStudent(address target, string memory apCode, uint pos) public {
        require(msg.sender == cohab.director, "Not authorized.");
        require(apsMap[apCode].numSpots > pos, "No such spot.");

        kickStudent(target);

        studentsMap[target].apCode = apCode;
        apsMap[apCode].students[pos] = target;
    }
}
