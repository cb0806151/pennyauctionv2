import * as reach from "@reach-sh/stdlib/ETH";

export const getAddressWording = (address, targetAddress) => {
  let defaultAddress = "0x0000000000000000000000000000000000000000";
  console.log(address, defaultAddress);
  let addressesEquate = address === defaultAddress;
  if (addressesEquate) address = "You";
  if (address === undefined) address = "...";
  if (address !== undefined) address = `${address.substring(0, 5)}...`;
  return address;
};
