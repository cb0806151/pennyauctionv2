import * as reach from "@reach-sh/stdlib/ALGO";

export const getAddressWording = (address, targetAddress) => {
  let defaultAddress = "0x0000000000000000000000000000000000000000";
  let addressesEquate = reach.addressEq(
    address || defaultAddress,
    targetAddress || defaultAddress
  );
  if (addressesEquate) address = "You";
  if (address === undefined) address = "...";
  if (address !== undefined) address = `${address.substring(0, 5)}...`;
  return address;
};
