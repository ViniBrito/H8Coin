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
        string year;
        bool exists;
        bool president;
        string ap;
    }

    struct StudentInfo {
        string name;
        string year;
        uint16 score;
        string ap;
    }

    struct Initiative {
        uint256 id;
        string name;
        address president;
    }

    struct ScoreEntry {
        address student;
        string initiative;
        uint16 score;
        string semester;
    }

    struct Cohab {
        address director;
    }

    Student[] public students;
    Apartment[] public aps;
    Initiative[] public initiatives;
    ScoreEntry[] public scoreEntries;
    Cohab public cohab;

    address constant public noAdd =  0x0000000000000000000000000000000000000000;
                                   
    constructor() {
        cohab.director = msg.sender;

        /*Inserir base: apartamentos, moradores e iniciativas, com as funções implementadas*/

    }

    mapping(address => Student) public studentsMap;
    mapping(string => Apartment) public apsMap;
    mapping(address => ScoreEntry[]) public scoreMap;
    mapping(bytes => ScoreEntry[]) public assigmentMap;

    function defineCohab(address addr) public {
        require(isCohab(addr), "Not authorized.");
        cohab.director = addr;
    }    

    /**
     * @dev Adds a student. Can only be called by cohab.
     * @param addr student address
     * @param name student name
     * @param year student year (e.g. "2018")
     * @param ap student ap (e.g. "201")
     */
    function addStudent(address addr, string memory name, string memory year, string memory ap) public {
        require(msg.sender == cohab.director, "Not authorized.");
        Student memory student_ = Student({
            name: name,
            year: year,
            exists: true,
            president: false,
            ap: ap
        });
        students.push(student_);
        studentsMap[addr] = student_;
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
        aps.push(ap_);
        apsMap[apCode] = ap_;
    }

    function addPresident(address addr) public{
        require(isCohab(msg.sender), "Must be president to do this");
        studentsMap[addr].president = true;
    }

    function addIniciative(string memory name, address president)public{
        require(isCohab(msg.sender), "Must be Cohab to do this");

        Initiative memory ini_ = Initiative({
            id: initiatives.length,
            name: name,
            president: president
        });

        addPresident(president);
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
            ap:  studentsMap[msg.sender].ap
        });
    }

    function getPointsInfo() public view returns (ScoreEntry[] memory){
        require(studentsMap[msg.sender].exists, "Unknown address.");

        return scoreMap[msg.sender];
    }

    /**
     * @dev Returns whether a student (address) is the president of an Initiative.
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

    function myIniciative(address addr)public view returns (string memory name) {
        for (uint i = 0; i < initiatives.length; i++) {
            if (initiatives[i].president == addr ) {
                name = initiatives[i].name;
            }
        }
    }


    /**
     * @dev Returns all score entries for a given semester.
     * This is used by the app to prevent double assignment.
     * The caller must be a president.
     * @param semester encoded as 'YYYYN', e.g. 20211, 20212
     */
    function getScoreEntriesForMyInitiative(uint16 semester, string memory iniciative) public view
            returns (ScoreEntry[] memory pontos ) {
        
        require(isStudentPresident(msg.sender) || isCohab(msg.sender), "Must be president or Cohab to do this.");
        
        if (isStudentPresident(msg.sender)){
            require(keccak256(abi.encodePacked(myIniciative(msg.sender))) == keccak256(abi.encodePacked(iniciative)), "It is not your Iniciative");
        }
        
        pontos = assigmentMap[abi.encodePacked(abi.encodePacked(iniciative), abi.encodePacked(semester))];

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
    function assignScore(address target, string memory semester, uint8 score) public {
        // TODO: semester needs proper validation
        require(score == 5 || score == 10 || score == 15 || score == 20 || score == 30, "Invalid score.");

        require(studentsMap[msg.sender].president, "Must be president to do this.");
        string memory iniciative = myIniciative(msg.sender);

        ScoreEntry memory entry_ = ScoreEntry({
            student: target,
            initiative: iniciative,
            score: score,
            semester: semester
        });
        scoreEntries.push(entry_);
        scoreMap[target].push(entry_);
        assigmentMap[abi.encodePacked(abi.encodePacked(iniciative), abi.encodePacked(semester))].push(entry_);
    }

    /**
     * @dev Kick a student from their spot. The caller must be cohab.
     * @param target the student to kick
     */
    function kickStudent(address target) public {
        require(msg.sender == cohab.director, "Not authorized.");

        Student memory aux = studentsMap[target];

        for (uint s = 0; s < apsMap[aux.ap].numSpots; s++) {
            if (apsMap[aux.ap].students[s] == target) {
                apsMap[aux.ap].students[s] = noAdd;
            }
        }
    }

    function assignApStudent(address target, string memory apa, uint pos) public {
        require(msg.sender == cohab.director, "Not authorized.");

        kickStudent(target);

        studentsMap[target].ap = apa;
        apsMap[apa].students[pos] == target;
    }

}

