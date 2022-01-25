// This is a nats mock implementation of the method client and publish
export const natsWrapper = {
  client: {
    publish: jest
      .fn()
      .mockImplementation(
        (subject: string, data: string, callback: () => void) => {}
      ),
  },
};
