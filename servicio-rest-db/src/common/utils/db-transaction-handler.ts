import { ClientSession, Connection } from 'mongoose';

export const dbTransactionHandler = async <T>(
  connection: Connection,
  cb: (session: ClientSession) => Promise<T>,
): Promise<T> => {
  const session = await connection.startSession();

  try {
    session.startTransaction();
    const result = await cb(session);
    await session.commitTransaction();
    return result;
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    await session.endSession();
  }
};

// const session = await this.connection.startSession();
// session.startTransaction();
