import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
};

const url = (path: string) => `http://localhost:3000/${path}`;

const AppConfiguration = {
  application_type: "web",
  client_name: "Hello World LTI",
  client_uri: url(""),
  grant_types: ["client_credentials", "implicit"],
  jwks_uri: url("jwks"),
  initiate_login_uri: url("login"),
  redirect_uris: [url("launch")],
  response_types: ["id_token"],
  scope: "openid",
  token_endpoint_auth_method: "private_key_jwt",
  logo_uri: url("/vercel.svg"),
  "https://purl.imsglobal.org/spec/lti-tool-configuration": {
    claims: [],
    custom_parameters: {},
    domain: "yaltt.inst.test",
    messages: [
      {
        type: "LtiResourceLinkRequest",
        label: "Hello World LTI",
        placements: ["https://canvas.instructure.com/lti/global_navigation"],
        roles: [],
        target_link_uri: url("launch"),
      },
    ],
    target_link_uri: url("launch"),
    "https://canvas.instructure.com/lti/privacy_level": "public",
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { token, install_endpoint } = req.body;
  console.log("Got request", install_endpoint, token);
  console.log("And postin: ", JSON.stringify(AppConfiguration));
  if (typeof install_endpoint === "string") {
    const installRequest = await fetch(
      install_endpoint,
      token
        ? {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            method: "POST",
            body: JSON.stringify(AppConfiguration),
          }
        : {}
    ).then((resp) => resp.json());
    console.log("Got response", installRequest);
    return res.status(200).json(installRequest);
  } else {
    return res.status(400).json({ message: "install_endpoint is required" });
  }
}
