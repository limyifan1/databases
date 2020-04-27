import * as functions from "firebase-functions";
import { connect } from "./config";

// import { Hippo } from "./entity/Hippo";

// import { Hat } from "./entity/Hats";
import { UniversityMember } from "./entity/University_Member";
import { Account } from "./entity/Account";
import { Has_Taken } from "./entity/Has_Taken";
import { Votes_On } from "./entity/Votes_On";
import { Professor } from "./entity/Professor";

export const prod = process.env.NODE_ENV === "production";

const cors = require("cors")({
  origin: true,
});

exports.createUniversityMember = functions.https.onRequest(async (req, res) => {
  return cors(req, res, async () => {
    const {
      computingID,
      firstName,
      middleName,
      lastName,
      gender,
      age,
    } = req.body;

    const connection = await connect();
    const getItem = connection.getRepository(UniversityMember);

    const newItem = await getItem.query(
      "INSERT INTO University_Member(computingID,firstName,middleName,lastName,gender,age) VALUES(?,?,?,?,?,?)",
      [computingID, firstName, middleName, lastName, gender, age]
    );

    // newItem.computingID = computingID;
    // newItem.firstName = firstName;
    // newItem.middleName = middleName;
    // newItem.lastName = lastName;
    // newItem.gender = gender;
    // newItem.age = age;

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(newItem);
  });
});

exports.getUniversityMember = functions.https.onRequest(async (req, res) => {
  return cors(req, res, async () => {
    const connection = await connect();
    const getItem = connection.getRepository(UniversityMember);
    const newItem = await getItem.query("SELECT * FROM University_Member");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(newItem);
  });
});

exports.getLogin = functions.https.onRequest(async (req, res) => {
  return cors(req, res, async () => {
    const { computingID } = req.body;
    const connection = await connect();
    const getItem = connection.getRepository(Account);
    const newItem = await getItem.query(
      "SELECT * FROM Account as a WHERE a.computingID = ?",
      [computingID]
    );
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(newItem);
  });
});

exports.getHasTaken = functions.https.onRequest(async (req, res) => {
  return cors(req, res, async () => {
    const { computingID } = req.body;
    const connection = await connect();
    const getItem = connection.getRepository(Has_Taken);
    const newItem = await getItem.query(
      "SELECT * FROM Has_Taken as a WHERE a.studentComputingID = ?",
      [computingID]
    );
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(newItem);
  });
});

exports.getVotesOn = functions.https.onRequest(async (req, res) => {
  return cors(req, res, async () => {
    const { computingID } = req.body;
    const connection = await connect();
    const getItem = connection.getRepository(Votes_On);
    const newItem = await getItem.query(
      "SELECT * FROM Votes_On as a WHERE a.studentComputingID = ?",
      [computingID]
    );
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(newItem);
  });
});

exports.deleteVotesOn = functions.https.onRequest(async (req, res) => {
  return cors(req, res, async () => {
    const { studentComputingID, professorComputingID } = req.body;
    const connection = await connect();
    const getItem = connection.getRepository(Votes_On);
    const newItem = await getItem.query(
      "DELETE FROM Votes_On WHERE studentComputingID = ? AND professorComputingID = ?",
      [studentComputingID, professorComputingID]
    );
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(newItem);
  });
});


exports.updateVotesOn = functions.https.onRequest(async (req, res) => {
  return cors(req, res, async () => {
    const {voteValue, studentComputingID, professorComputingID } = req.body;
    const connection = await connect();
    const getItem = connection.getRepository(Votes_On);
    const newItem = await getItem.query(
      "UPDATE Votes_On SET voteValue = ? WHERE studentComputingID = ? AND professorComputingID = ?",
      [voteValue ,studentComputingID, professorComputingID]
    );
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(newItem);
  });
});

exports.getProfessor = functions.https.onRequest(async (req, res) => {
  return cors(req, res, async () => {
    const connection = await connect();
    const getItem = connection.getRepository(Professor);
    const newItem = await getItem.query(
      "SELECT * FROM Professor"
    );
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(newItem);
  });
});

exports.addVotesOn = functions.https.onRequest(async (req, res) => {
  return cors(req, res, async () => {
    const {voteValue, studentComputingID, professorComputingID } = req.body;

    const connection = await connect();
    const getItem = connection.getRepository(Votes_On);

    const newItem = await getItem.query(
      "INSERT INTO Votes_On(studentComputingID,professorComputingID,voteValue) VALUES(?,?,?)",
      [studentComputingID, professorComputingID, voteValue]
    );

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(newItem);
  });
});


// export const createHat = functions.https.onRequest(
//   async (request, response) => {
//     const { owner } = request.body;

//     const connection = await connect();
//     const repo = connection.getRepository(Hat);

//     const newHat = new Hat();
//     newHat.owner = owner;
//     // newHat.color = color;

//     const savedHat = await repo.save(newHat);
//     response.send(savedHat);
//   }
// );

// export const createHippo = functions.https.onRequest(
//   async (request, response) => {
//     const { name, weight } = request.body;

//     try {
//       const connection = await connect();

//       const repo = connection.getRepository(Hippo);

//       const newHippo = new Hippo();
//       newHippo.name = name;
//       newHippo.weight = weight;

//       const savedHippo = await repo.save(newHippo);

//       response.send(savedHippo);
//     } catch (error) {
//       response.send(error);
//     }
//   }
// );

// export const getHippos = functions.https.onRequest(
//   async (request, response) => {
//     const connection = await connect();
//     const hippoRepo = connection.getRepository(Hippo);

//     // JOIN Query
//     const hipposWearingHats = await hippoRepo
//       .createQueryBuilder("hippo")
//       .leftJoinAndSelect("hippo.hats", "hat")
//       .getMany();

//     response.send(hipposWearingHats);
//   }
// );
