import { SPHubSite } from "../../objects/HubSite.class";
import { instance } from "./Base.instance";

/**
 * The function returns the hub site object.
 * @returns the value of `instance()['hub']`, which is of type `SPHubSite`.
 */
export const theHub = (): SPHubSite => {
  return instance()["hub"];
};
