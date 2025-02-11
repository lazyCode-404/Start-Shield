import { create } from "ipfs-http-client";

const ipfs = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

export const uploadToIPFS = async (file) => {
  try {
    const added = await ipfs.add(file);
    return `https://ipfs.infura.io/ipfs/${added.path}`;
  } catch (error) {
    console.error("Error uploading file to IPFS:", error);
    return null;
  }
};

