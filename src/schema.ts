import { makeExecutableSchema } from '@graphql-tools/schema';
import { deleteEOI, insertEOI } from './repository/EOIRepository';
import { now } from './repository/MetaRepository';
import {
  getNomineeByID,
  getNomineeByProgramID,
  getNominees,
  insertNominee,
} from './repository/NomineeRepository';
import { getProgramByID, getPrograms } from './repository/ProgramRepository';
import { getTeachers } from './repository/TeacherRepository';

// GQL type defintions
const typeDefinitions = /* GraphQL */ `
  type Query {
    info: String!
    time: String!
    getTeachers: [Teacher]
    getNominees: [Nominee]
    getNomineeByNomineeID(nominee_id: ID!): Nominee!
    getNomineesByProgram(program_id: ID!): [Nominee]
    getPrograms: [Program]
    getProgramByID(program_id: ID!): Program!
  }

  type Mutation {
    insertEOI(nominee_id: ID!, program_id: ID!): Int!
    deleteEOI(nominee_id: ID!, program_id: ID!): Int!
    insertNominee(contact_email: String!, name: String!): Int!
  }

  type Program {
    program_id: ID
    program_name: String
    year_levels: String
    event_type: String
    term: String
    cost: String
    location: String
    pre_requisite: String
    faculty_name: String
    hod_email: String
    hod_name: String
    tic_emails: String
    tic_names: String
    details: String
    consolidating_features: String
  }

  type Nominee {
    nominee_id: String!
    name: String!
    contact_email: String!
  }

  type Teacher {
    name: String!
    email: String!
  }
`;

// GQL resolvers
const resolvers = {
  Query: {
    time: async () => (await now()).rows[0]['now'],
    getTeachers: async () => (await getTeachers()).rows,
    getNominees: async () => (await getNominees()).rows,
    getNomineeByNomineeID: async (
      parent: unknown,
      args: { nominee_id: string }
    ) => (await getNomineeByID(args.nominee_id)).rows[0],
    getNomineesByProgram: async (
      parent: unknown,
      args: { program_id: string }
    ) => (await getNomineeByProgramID(args.program_id)).rows,
    getPrograms: async () => (await getPrograms()).rows,
    getProgramByID: async (parent: unknown, args: { program_id: string }) =>
      await getProgramByID(args.program_id),
  },

  Mutation: {
    insertEOI: async (
      parent: unknown,
      args: { nominee_id: string; program_id: string }
    ) => await insertEOI(args.nominee_id, args.program_id),
    deleteEOI: async (
      parent: unknown,
      args: { nominee_id: string; program_id: string }
    ) => await deleteEOI(args.nominee_id, args.program_id),
    insertNominee: async (
      parent: unknown,
      args: { contact_email: string; name: string }
    ) =>
      (await insertNominee(args.contact_email, args.name)).rows[0].nominee_id,
  },
};

// GQL schema gluer
export const schema = makeExecutableSchema({
  resolvers: [resolvers],
  typeDefs: [typeDefinitions],
});
