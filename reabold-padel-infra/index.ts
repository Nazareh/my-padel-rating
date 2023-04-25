import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";
import matchServiceLambda from "./lambdas/matchService"


const endpoint = new awsx.classic.apigateway.API("reabold-api", {
    routes: [
      {
        path: "/match",
        method: "GET",
        eventHandler: matchServiceLambda,
      },
    ],
  });
  
  // Pulumi exports values
  // See these outputs using: pulumi stack output endpointUrl
  export const endpointUrl = endpoint.url;
  