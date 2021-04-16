import Queue from "bull";

interface Payload {
  order: string;
}

const expirationQueue = new Queue<Payload>("order:expiration", {
  redis: {
    host: process.env.REDIS_HOST,
  },
});

expirationQueue.process(async (job) => {
  console.log(
    "I want to publish an expiration complete event for orderId",
    job.data.order
  );
});

export { expirationQueue };
