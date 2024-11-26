export const installApp = async (params: {
  install_endpoint?: string;
  registration_token?: string;
}) => {
  await fetch("/api/install", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: params.registration_token,
      install_endpoint: params.install_endpoint,
    }),
  });
};
