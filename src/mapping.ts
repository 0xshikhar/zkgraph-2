//@ts-ignore
import { Bytes, Block, Event, require } from "@hyperoracle/zkgraph-lib";

// Event signature for KYC status update
let kycUpdateEventSig = Bytes.fromHexString("0xCD945FD9Af112b5427BbEC64cF4b2C3811C57E43");

// Function to handle blocks
export function handleBlocks(blocks: Block[]): Bytes {
  let events: Event[] = blocks[0].events;
  let kycUpdates: Bytes[] = [];

  // Iterate through events to find KYC update events
  for (let event of events) {
    if (event.esig == kycUpdateEventSig) {
      // Assuming the KYC status is stored in topic2
      let userAddress = event.topic1;
      let kycStatus = event.topic2;

      // Process the KYC status update
      kycUpdates.push(userAddress.concat(kycStatus));
    }
  }

  // Convert the updates to a single byte array
  let state = Bytes.empty();
  for (let update of kycUpdates) {
    state = state.concat(update);
  }

  return state;
}
