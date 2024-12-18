import { create } from "../../../../node_modules/ipfs-http-client/dist/index.min.js";


const ipfs = create("https://ipfs.infura.io:5001");

export const uploadToIPFS = async (file) => {
  try {
    const added = await ipfs.add(file);
    return `https://ipfs.infura.io/ipfs/${added.path}`;
  } catch (error) {
    console.error("Error uploading file to IPFS:", error);
    return null;
  }
};
