import * as reach from "@reach-sh/stdlib/ALGO";

export const getAddressWording = (address, targetAddress) => {
  return reach.addressEq(
    address || "0x0000000000000000000000000000000000000000",
    targetAddress || "0x0000000000000000000000000000000000000000"
  )
    ? "You"
    : address;
};
